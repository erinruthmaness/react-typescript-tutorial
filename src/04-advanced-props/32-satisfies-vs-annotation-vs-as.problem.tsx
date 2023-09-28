import { ComponentProps } from "react";
import { Equal, Expect } from "../helpers/type-utils";

const original_buttonProps = {
  type: "button",
  illegalProperty: "I AM ILLEGAL", //we want this to error
};

const mySolution_buttonProps: Omit<ComponentProps<"button">, "type"> & { type: "button"; } = {
  type: "button",
  // @ts-expect-error
  illegalProperty: "I AM ILLEGAL", //we want this to error
};

const mattsBadSolution_buttonProps = {
  type: "button",
  illegalProperty: "I AM ILLEGAL", //we want this to error
} as ComponentProps<"button">; //this completely transforms the original button props into this object and doesn't fix the illegalProperty

const mattsGoodSolution_buttonProps = {
  type: "button",
  // @ts-expect-error
  illegalProperty: "I AM ILLEGAL", //we want this to error
} satisfies ComponentProps<"button">; //makes sure that it's a certain type without allowing access to additional parts of the type that aren't defined here

<>
  <button {...mySolution_buttonProps}>Click Me!</button>
</>;

const buttonPropType = mySolution_buttonProps.type;

type test = Expect<Equal<typeof buttonPropType, "button">>;
