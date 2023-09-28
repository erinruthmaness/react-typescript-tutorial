import { ChangeEventHandler } from "react";

/**
 * It would be really nice to refactor this so that it's
 * more reusable. We can do that with a type helper.
 *
 * We want to create a type helper that takes in a type,
 * and returns it along with a union with all of its
 * keys turned to undefined.
 */


export type InputProps = (
  | {
    value: string;
    onChange: ChangeEventHandler;
  }
  | {
    value?: undefined;
    onChange?: undefined;
  }
) & {
  label: string;
};

type SometimesOptionalInputProps = { value: string; onChange: ChangeEventHandler; };

type My_AllowUndefined<T> = T | { [P in keyof T]?: undefined };
export type My_InputProps = My_AllowUndefined<SometimesOptionalInputProps> & { label: string; };

type Matts1_ToUndefinedObject<T> = Partial<Record<keyof T, undefined>>;
type Matts1_AllOrNothing<T> = T | Matts1_ToUndefinedObject<T>;
export type Matts1_InputProps = Matts1_AllOrNothing<SometimesOptionalInputProps> & { label: string; };

export const Input = ({ label, ...props }: My_InputProps) => {
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
