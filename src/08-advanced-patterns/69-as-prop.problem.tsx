/**
 * The 'as' prop is notorious for being difficult to type correctly.
 *
 * Here, we've created a component that takes an 'as' prop. The 'as' prop
 * is a string representing the HTML tag to render. The component will
 * render that tag, and pass all the other props through.
 *
 * BUT currently the types of the props that go along with the 'as' prop
 * are not inferred correctly.
 *
 * I've found two solutions. The first uses an IIMT:
 *
 * https://www.totaltypescript.com/immediately-indexed-mapped-type
 *
 * The second uses a generic type.
 *
 * Both solutions make use of:
 *
 * - JSX.IntrinsicElements
 * - keyof
 * - 'as'
 * - Indexed access types
 */
import { Equal, Expect } from "../helpers/type-utils";

//my idea
type My_AsPropValue = (keyof JSX.IntrinsicElements);
type My_OtherValidProps<P extends My_AsPropValue> = JSX.IntrinsicElements[P];

type My_WrapperProps<P extends My_AsPropValue> = {
  as: P;
} & My_OtherValidProps<P>;

export const My_Wrapper = <T extends My_AsPropValue,>(props: My_WrapperProps<T>) => {
  const Comp = props.as;
  //note! I was only missing adding "as string" to the above!
  //hover over Comp and you can tell it was struggling to narrow down what its type was
  //it also works if I add `as My_AsPropValue` instead of `as string` - nice
  // @ts-expect-error JSX element type 'Comp' does not have any construct or call signatures.  const Comp: T | (T & (string | undefined))
  return <Comp {...(props as My_OtherValidProps<T>)}></Comp>;
};

//solution 1 - lots of work for the IDE to index though
//this instantiates every single possible option as a union type
type WrapperProps1 = {
  [Element in keyof JSX.IntrinsicElements]: {
    as: Element;
  } & React.ComponentProps<Element>
}[keyof JSX.IntrinsicElements];

//solution 2
type WrapperProps2<T extends keyof JSX.IntrinsicElements> = {
  as: T;
} & React.ComponentProps<T>;

export const Wrapper = <T extends keyof JSX.IntrinsicElements,>(props: WrapperProps2<T>) => {
  const Comp = props.as as string;
  return <Comp {...(props as any)}></Comp>;
};

/**
 * Should work specifying a 'button'
 */

const Example1 = () => {
  return (
    <>
      <Wrapper
        as="button"
        // @ts-expect-error doesNotExist is not a valid prop
        doesNotExist
      ></Wrapper>

      <Wrapper
        as="button"
        // e should be inferred correctly
        onClick={(e) => {
          type test = Expect<
            Equal<typeof e, React.MouseEvent<HTMLButtonElement>>
          >;
        }}
      ></Wrapper>
    </>
  );
};

/**
 * Should work specifying a 'div'
 */

const Example2 = () => {
  return (
    <>
      <Wrapper
        as="div"
        // @ts-expect-error doesNotExist is not a valid prop
        doesNotExist
      ></Wrapper>

      <Wrapper
        as="div"
        // e should be inferred correctly
        onClick={(e) => {
          type test = Expect<Equal<typeof e, React.MouseEvent<HTMLDivElement>>>;
        }}
      ></Wrapper>
    </>
  );
};
