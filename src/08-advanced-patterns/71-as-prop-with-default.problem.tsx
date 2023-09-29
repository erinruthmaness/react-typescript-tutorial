import { ElementType } from "react";
import { Equal, Expect } from "../helpers/type-utils";

export const Link = <TAs extends ElementType>( //when you pass a default value (like `TAs extends ElementType = "a"`), it works except you lose autocomplete - TS glitch
  props: {
    as?: TAs;
  } & React.ComponentPropsWithoutRef<
    //if TAs is the default value, pass "a" instead
    //but if TAs has a value that isn't the default, pass that instead
    ElementType extends TAs ? "a" : TAs //if "ElementType" can be passed to TAs - it will fail if TAs is more narrow than ElementType
  >,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest}></Comp>;
};

/**
 * Should work without specifying 'as'
 */

const Example1 = () => {
  return (
    <>
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
  return (
    <>
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

const Custom = (
  props: { thisIsRequired: boolean; },
  ref: React.ForwardedRef<HTMLAnchorElement>,
) => {
  return <a ref={ref} />;
};

const Example3 = () => {
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
    </>
  );
};
