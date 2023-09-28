import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

export const useStateAsObject = <T>(initial: T) => {
  //could pass the T manually to useState... even though you don't need to since you're passing "initial" which is type of T
  const [value, set] = useState<T>(initial);

  return {
    value,
    set,
  };
};

const example = useStateAsObject({ name: "Matt" });

type ExampleTests = [
  Expect<Equal<typeof example.value, { name: string }>>,
  Expect<
    Equal<
      typeof example.set,
      React.Dispatch<React.SetStateAction<{ name: string }>>
    >
  >,
];

const num = useStateAsObject(2);

type NumTests = [
  Expect<Equal<typeof num.value, number>>,
  Expect<Equal<typeof num.set, React.Dispatch<React.SetStateAction<number>>>>,
];
