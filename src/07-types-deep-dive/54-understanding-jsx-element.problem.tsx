/**
 * 1. What's the difference between JSX.Element,
 * React.ReactNode and React.ReactElement?
 *
 * CMD-click each of them to understand the difference.
 */

type ClickMeThree = React.ReactNode; //all the things you could possibly render within a React component
/*
type ReactNode =
        | ReactElement
        | string
        | number
        | ReactFragment
        | ReactPortal
        | boolean
        | null
        | undefined
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES];
*/
type ClickMe = React.ReactElement; //this is what React.createElement spits out
//is a member(?) of React.ReactNode
/*
    interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
        type: T;
        props: P;
        key: Key | null;
    }
*/

type ClickMeToo = JSX.Element;
//extends React.ReactElement<any, any>
//JSX is a global namespace declared in the React index.d.ts file - comparable to React.JSX.Element, which
//is basically the JSX namespace re-declared within the React namespace for tidiness/consistency
//JSX.Element is essentially identical to React.ReactElement, but declared in a different namespace

/**
 * 2. What is the return type of this Component?  //JSX.Element
 */
const Component = () => {
  return <div>Hello world</div>;
};

/**
 * 3. Fun fact - this might break on your IDE! In
 * TypeScript 5.0, this wouldn't work. But in TypeScript
 * 5.1, it DOES work.
 *
 * If it's not working for you, try making your IDE use
 * the 'workspace' version of TypeScript.
 *
 * https://stackoverflow.com/questions/39668731/what-typescript-version-is-visual-studio-code-using-how-to-update-it
 */
const Component2 = (): React.ReactNode => {
  return <div></div>;
};

<>
  <Component2 />
</>;

/**
 * 4a. Why does this component NOT error...
 */
const Component3 = (): React.ReactElement => {
  return <div></div>;
};

<>
  <Component3 />
</>;

/**
 * 4b. ...but this one does?  //the string doesn't count as JSX
 */
const Component4 = (): React.ReactElement => {
  // @ts-expect-error
  return "hello!";
};

/* TAKEAWAY:
You probably don't need to use either JSX.Element or React.ReactElement in your code, because they're too narrow.
*/