import { useRef } from "react";

type RefType<T> = React.RefObject<T>; //RefObject is readonly
//Usage note: if you need the result of useRef to be directly mutable, include | null in the type of the generic argument.

//React guesses which kind of Ref you're creating based on what you pass in!
//if you pass it "null" as an initial argument (when it isn't part of the Type you defined)
//it comes back as a readonly ref, presumably because it's expecting a HTMLElement value there
//and you want React to manage the ref's value rather than you doing it manually

export const Component = () => {
  const ref = useRef<string | null>(null);

  // Why is this not allowed?
  ref.current = "Hello";

  // convenience overload for refs given as a ref prop as they typically start with a null value
  const readonlyRef = useRef<string>(null);
  // @ts-expect-error
  readonlyRef.current = "something else!";

  const mutableRef = useRef<string>("this one is mutable because it has an initial value");
  mutableRef.current = "changing the value";

  // convenience overload for potentially undefined initialValue / call with 0 arguments
  // has a default to stop it from defaulting to {} instead
  const thirdKindOfRef = useRef<string>();
  thirdKindOfRef.current = "this one works the same as the mutableRef";

  return null;
};
