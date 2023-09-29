import { Equal, Expect } from "../helpers/type-utils";

/**
 * It's actually possible to change things in the global namespace
 * in TypeScript.
 *
 * 1. Add a declaration for React.MyInterface to the global React
 * namespace below.
 */
//anything that gets declared in here will be merged with the existing namespace
declare global {
  namespace React {
    type MyInterface = {
      foo: string
    }
  }
}

type test = Expect<Equal<React.MyInterface, { foo: string }>>;

export {};
