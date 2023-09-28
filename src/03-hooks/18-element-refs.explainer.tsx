import { Equal, Expect } from "../helpers/type-utils";

export const nullAsRef = (
  <div
    ref={{
      current: null, //can only be null or HTMLDivElement (like you could say Document.createElement("div") here if you're nasty)
    }}
  ></div>
);

// Legacy refs are supported!
export const stringAsRef = <div ref={"legacyRef"}></div>;

//refs can be null but can't be undefined: when the div is unmounted, React
//will call `ref` with an empty value of `null`, NOT of `undefined`... so
//they've made it impossible to pass it `undefined`
export const undefinedAsRef = (
  <div
    ref={{
      // Type 'undefined' is not assignable to
      // type 'HTMLDivElement | null'.
      // @ts-expect-error
      current: undefined,
    }}
  ></div>
);

// Callback refs are supported via RefCallback<T>
export const callbackRefs = (
  <div
    ref={(htmlDivElement) => {
      type test = Expect<Equal<typeof htmlDivElement, HTMLDivElement | null>>;
    }}
  ></div>
);
