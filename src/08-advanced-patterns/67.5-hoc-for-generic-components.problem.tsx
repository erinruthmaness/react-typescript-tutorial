import { Router, useRouter } from "fake-external-lib";
import { Equal, Expect } from "../helpers/type-utils";

//my attempt
// @ts-expect-error TProps can't take a generic
type My_ComponentGettingWrapped<TProps, P> = (props: TProps<P>) => React.ReactElement;
type My_RouterHOC<TProps, P> = (Component: My_ComponentGettingWrapped<TProps, P>) => React.ReactElement;

//solution
type ComponentGettingWrapped<TProps> = (props: TProps) => React.ReactNode;
type HOCReturnType<TProps> = (props: Omit<TProps, "router">) => React.ReactNode;

//solution: withRouter is still a generic function (takes TProps), but 
//it now has a specific ReturnType so that the `.displayName` mutation doesn't ruin the inference outside of `withRouter`,
//and just cast displayName onto a type that makes sense internally
export const withRouter = <TProps,>(Component: ComponentGettingWrapped<TProps>): HOCReturnType<TProps> => {

  const NewComponent = (props: Omit<TProps, "router">) => {
    const router = useRouter();
    return <Component {...(props as TProps)} router={router} />;
  };

  NewComponent.displayName = `withRouter(${(Component as { displayName?: string; }).displayName})`;

  return NewComponent;
};

type TableProps<T> = {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  router: Router;
};

export const Table = <T,>(props: TableProps<T>) => {
  return <table />;
};

const WrappedTable = withRouter(Table);

<>
  {/* @ts-expect-error router is required! */}
  <Table
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />

  <WrappedTable
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />

  <WrappedTable
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />
</>;
