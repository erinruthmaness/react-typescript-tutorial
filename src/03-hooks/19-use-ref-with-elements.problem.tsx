import { useRef } from "react";

export const Component = () => {
  const ref = useRef<HTMLDivElement>(null); //we just learned that refs can't be undefined - the placeholder must be `null`

  return <div ref={ref} />;
};
