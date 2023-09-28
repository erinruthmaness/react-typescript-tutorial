import { Equal, Expect } from "../helpers/type-utils";

export type InputProps = Omit<React.ComponentProps<"input">, "onChange"> & { onChange: (value: string) => void }

type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> & TOverridden
export type InputPropsWithOverrideInstead = OverrideProps<React.ComponentProps<"input">, { onChange: (value: string) => void }>

export const Input = (
  props: InputProps
) => {
  return (
    <input
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    ></input>
  );
};

const Parent = () => {
  return (
    <Input
      onChange={(e) => {
        console.log(e);

        type test = Expect<Equal<typeof e, string>>;
      }}
    ></Input>
  );
};
