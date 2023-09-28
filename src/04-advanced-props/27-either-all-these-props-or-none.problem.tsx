import { ChangeEventHandler } from "react";

/**
 * In this exercise, we want to create a component that can either have
 * `value` and `onChange` props, or neither of those props.
 *
 * We ALSO want to have label as a required prop.
 *
 * 1. Figure out why the errors are occurring on the `Test` component.
 *
 * 2. Find a way to fix the errors.
 */
type InputProps = (
  | {
    value: string;
    onChange: ChangeEventHandler;
  }
  | { value?: never; onChange?: never; } //this only works because "never" is reduced to "undefined"
  //if it's in a union with something else, it always just reduces itself to "undefined"
  //so you might as well used "undefined" in the first place
) & {
  label: string;
};

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label>
        {label}
        <input {...props} />
      </label>
    </div>
  );
};

export const Test = () => {
  return (
    <div>
      <Input label="Greeting" value="Hello" onChange={() => { }} />
      <Input label="Greeting" />

      {/* @ts-expect-error */}
      <Input label="Greeting" value="Hello" />

      {/* @ts-expect-error */}
      <Input label="Greeting" onChange={() => { }} />
    </div>
  );
};
