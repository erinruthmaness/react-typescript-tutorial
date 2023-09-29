import { ReactNode } from "react";

/**
 * In this example we have a Select component. Through some magic, we're
 * attempting to strongly type the children of the Select component so
 * that you can only pass 'Option' elements to it.
 *
 * 1. Try to understand the type of OptionType. What's the __brand property
 * for?
 * narrowing
 * > branded types actually exist in TS and are useful, but it's not working here
 *
 * 2. There's an error happening at <Option /> below. Why is that?
 * Property '__brand' is missing in type 'ReactElement<any, any>' but required in type '{ __brand: "OPTION_TYPE"; }'
 * > when it's written < Option /> it's declared as JSX.Element; when you call it (Option()) it's inferred as OptionType, the return type
 *
 * 3. Try changing <Option /> to {Option()}. This appears to work. Why?
 * And why is this NOT a good idea?
 * bad idea bc you're calling a component like a function and it's not how you do React
 * > it means you're calling them "eagerly" instead of scheduling them for React to call - taking them out of React's reconciliation algorithm
 *
 * 4. Is what we're attempting to do even possible?
 * > no, because everything in angle brackets ends up a JSX.Element no matter what - no way to narrow the type
 */

type OptionType = {
  __brand: "OPTION_TYPE";
} & ReactNode;

const Option = () => {
  return (<option></option>) as OptionType;
};

const Select = (props: { children: OptionType }) => {
  return <select>{props.children}</select>;
};

<Select>
  {/* @ts-expect-error */}
  <Option />
</Select>;
