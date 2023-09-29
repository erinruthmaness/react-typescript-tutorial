import React from "react";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * FYI - this solution took me the best part of a whole day to find,
 * and the help of several TS experts in the community.
 *
 * So, don't feel bad if you don't find it at all.
 */
// Added fixedForwardRef from a previous exercise

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
) => (props: P & React.RefAttributes<T>) => React.ReactNode;
const fixedForwardRef = React.forwardRef as FixedForwardRef;

//calls Omit on each member of a union type
//conditional types distribute over all members of the union
//so `T extends any` runs on each member of the union, returns true (duh), and then runs Omit on that member
type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any ? Omit<T, TOmitted> : never;
//checks if TAs is narrower than React.ElementType: if yes, returns TAs. If no, returns "a" (anchor)
type WrappedElementType<TAs extends React.ElementType> = React.ElementType extends TAs ? "a" : TAs;
//all the props that go with an Element of type TAs, including a ref
type TAsElementProps<TAs extends React.ElementType> = React.ComponentPropsWithRef<WrappedElementType<TAs>>;
//go through all the union types and pick out anything called "as"
type TAsElementPropsOmittingAs<TAs extends React.ElementType> = DistributiveOmit<TAsElementProps<TAs>, "as">;
type Props<TAs extends React.ElementType> = {
  as?: TAs;
} & TAsElementPropsOmittingAs<TAs>;

export const UnwrappedLink = <TAs extends React.ElementType>(
  props: Props<TAs>,
  ref: React.ForwardedRef<any>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};

const Link = fixedForwardRef(UnwrappedLink);

/**
 * Should work without specifying 'as'
 */

const Example1 = () => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const wrongRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Link ref={ref} />

      <Link
        // @ts-expect-error incorrect ref
        ref={wrongRef}
      />

      <Link
        // @ts-expect-error doesNotExist is not a valid prop
        doesNotExist
      ></Link>

      <Link
        // e should be inferred correctly
        onClick={(e) => {
          type test = Expect<
            Equal<typeof e, React.MouseEvent<HTMLAnchorElement>>
          >;
        }}
      ></Link>
    </>
  );
};

/**
 * Should work specifying a 'button'
 */

const Example2 = () => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const wrongRef = React.useRef<HTMLSpanElement>(null);

  return (
    <>
      {/* CHECK ME! Check if autocomplete works on 'as' */}
      <Link as="button" />

      <Link as="button" ref={ref} />

      <Link
        as="button"
        // @ts-expect-error incorrect ref
        ref={wrongRef}
      />

      <Link
        as="button"
        // @ts-expect-error doesNotExist is not a valid prop
        doesNotExist
      ></Link>

      <Link
        as="button"
        // e should be inferred correctly
        onClick={(e) => {
          type test = Expect<
            Equal<typeof e, React.MouseEvent<HTMLButtonElement>>
          >;
        }}
      ></Link>
    </>
  );
};

/**
 * Should work with Custom components!
 */

const Custom = fixedForwardRef(
  (
    props: { thisIsRequired: boolean; },
    ref: React.ForwardedRef<HTMLAnchorElement>,
  ) => {
    return <a ref={ref} />;
  },
);

const Example3 = () => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const wrongRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <Link as={Custom} thisIsRequired />
      <Link
        as={Custom}
        // @ts-expect-error incorrectProp should not be allowed
        incorrectProp
      />

      {/* @ts-expect-error thisIsRequired is not being passed */}
      <Link as={Custom}></Link>

      <Link as={Custom} ref={ref} thisIsRequired />

      <Link
        as={Custom}
        // @ts-expect-error incorrect ref
        ref={wrongRef}
        thisIsRequired
      />
    </>
  );
};
