import { Equal, Expect } from "../helpers/type-utils";

type InputProps = React.ComponentProps<"input">;

/**
 * All these components take the same props!
 *
 * We don't want to repeat ourselves by typing
 * props: InputProps for each component.
 *
 * There must be a better way!
 *
 * Hint: Record and satisfies will come in handy.
 */

//my solution - not bad, but "string" would have to be manually narrowed
//Record overrides the type - it's TOO STRONG
const COMPONENTS_1: Record<string, React.FC<InputProps>> = {
  text: (props) => {
    return <input {...props} type="text" />;
  },
  number: (props) => {
    return <input {...props} type="number" />;
  },
  password: (props) => {
    return <input {...props} type="password" />;
  },
};

//this solution manages to allow `keyof typeof` below to infer the actual key names instead of string
//because instead of us saying "this is a Record with strings as keys" like we did above,
//it knows that this object counts as a Record with string keys, but the concept of the keys being
//strings doesn't override TS's ability to infer things from the object itself...
const COMPONENTS_2 = {
  text: (props) => {
    return <input {...props} type="text" />;
  },
  number: (props) => {
    return <input {...props} type="number" />;
  },
  password: (props) => {
    return <input {...props} type="password" />;
  },
  beepboop: (props) => {
    return <input {...props} type="email" />;
  }
} satisfies Record<string, React.FC<InputProps>>;

export const Input = (
  props: {
    type: keyof typeof COMPONENTS_2;
  } & InputProps
) => {
  const Component = COMPONENTS_2[props.type];
  return <Component {...props} />;
};

<>
  <Input
    type="number"
    onChange={(e) => {
      // e should be properly typed!
      type test = Expect<Equal<typeof e, React.ChangeEvent<HTMLInputElement>>>;
    }}
  ></Input>
  <Input type="text"></Input>
  <Input type="password"></Input>

  {/* @ts-expect-error */}
  <Input type="email"></Input>
</>;
