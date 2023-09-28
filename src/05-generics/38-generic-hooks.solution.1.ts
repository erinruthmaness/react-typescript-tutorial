import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * 1. Take a look at each solution, noting the differences between each.
 * With some, you might need to do some 'spot the difference' to see
 * what's changed.
 *
 * 2. Which solution do you think is best? Why?
 */
//the param "initial" is the thing from which we want to infer the type
//if you don't pass a type argument where one is expected (i.e. "useState"),
//it will infer the type argument from the runtime argument
//so here, TS saw that the type of "initial" is "T", and therefore 
//it passed the runtime "type" value of T to useState for you
export const useStateAsObject = <T>(initial: T) => {
  const [value, set] = useState(initial);

  return {
    value,
    set,
  };
};

const example = useStateAsObject({ name: "Matt" });

type ExampleTests = [
  Expect<Equal<typeof example.value, { name: string; }>>,
  Expect<
    Equal<
      typeof example.set,
      React.Dispatch<React.SetStateAction<{ name: string; }>>
    >
  >,
];

const num = useStateAsObject(2);

type NumTests = [
  Expect<Equal<typeof num.value, number>>,
  Expect<Equal<typeof num.set, React.Dispatch<React.SetStateAction<number>>>>,
];
