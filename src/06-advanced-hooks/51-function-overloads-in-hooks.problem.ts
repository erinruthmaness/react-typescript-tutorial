import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Returning to our useStateAsObject function, we now want to make it work
 * EXACTLY like useState, where if you NOTHING, it returns T | undefined.
 *
 * If you pass a default value, it should NOT include undefined.
 */
function useStateAsObject<T>(initial: T): { value: T; set: React.Dispatch<React.SetStateAction<T>>; };
function useStateAsObject<T>(): { value: T | undefined; set: React.Dispatch<React.SetStateAction<T | undefined>>; };
function useStateAsObject<T>(initial?: T) {
  const [value, set] = useState(initial);

  return {
    value,
    set,
  };
}

/**
 * If you DO pass a default value, the result should NOT include undefined
 */
const notUndefined = useStateAsObject({ name: "Matt" });

type ExampleTests = [
  Expect<Equal<typeof notUndefined.value, { name: string; }>>,
  Expect<
    Equal<
      typeof notUndefined.set,
      React.Dispatch<React.SetStateAction<{ name: string; }>>
    >
  >,
];

/**
 * If you don't pass a value, it should be undefined
 */
const hasUndefined = useStateAsObject<number>();

type NumTests = [
  Expect<Equal<typeof hasUndefined.value, number | undefined>>,
  Expect<
    Equal<
      typeof hasUndefined.set,
      React.Dispatch<React.SetStateAction<number | undefined>>
    >
  >,
];
