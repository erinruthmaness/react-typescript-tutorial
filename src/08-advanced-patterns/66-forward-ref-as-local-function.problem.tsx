import React from "react";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Using the forward-ref-with-generics explanation as a guide,
 * give fixedForwardRef a type signature that allows it to
 * work with the example below.
 */

//this is adding an extra function on top, which isn't really necessary
type RenderType<T, P = {}> = (props: P, ref: React.Ref<T>) => React.ReactNode;
type ReturnType<T, P = {}> = (props: P & React.RefAttributes<T>) => React.ReactNode;

function fixedForwardRef<T, P = {}>(render: RenderType<T, P>): ReturnType<T, P> {
  return React.forwardRef(render) as ReturnType<T, P>;
}

//but, it's also possible to......
type FixedForwardRefType = <T, P = {}>(render: RenderType<T, P>) => ReturnType<T, P>;
const fixedForwardRef2 = React.forwardRef as FixedForwardRefType; //basically just overwrite the type of forwardRef

type Props<T> = {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
};

export const Table = <T,>(
  props: Props<T>,
  ref: React.ForwardedRef<HTMLTableElement>,
) => {
  return <table ref={ref} />;
};

const ForwardReffedTable = fixedForwardRef2(Table);

const Parent = () => {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const wrongRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <ForwardReffedTable
        ref={tableRef}
        data={["123"]}
        renderRow={(row) => {
          type test = Expect<Equal<typeof row, string>>;
          return <div>123</div>;
        }}
      />
      <ForwardReffedTable
        // @ts-expect-error
        ref={wrongRef}
        data={["123"]}
        renderRow={(row) => {
          return <div>123</div>;
        }}
      />
    </>
  );
};
