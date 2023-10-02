import ReactSelect, { GroupBase, Props } from "react-select";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * 1. Try to figure out the types the props of the Select component should have,
 * including the generic types!
 *
 * Here's a clue: ReactSelect exports a type called 'Props'...
 */
// type StateManagedSelect<
//    Option = unknown, IsMulti extends boolean = false, 
//    Group extends GroupBase<Option> = GroupBase<Option>
// >(props: StateManagerProps<Option, IsMulti, Group> & RefAttributes<Select<Option, IsMulti, Group>>

//type StateManagerProps<
//    Option = unknown, 
//    IsMulti extends boolean = boolean, 
//    Group extends GroupBase<Option> = GroupBase<Option>
// > = SelectPropsWithOptionalStateManagedProps<Option, IsMulti, Group> & StateManagerAdditionalProps<Option>

//type SelectPropsWithOptionalStateManagedProps<
//    Option, 
//    IsMulti extends boolean, 
//    Group extends GroupBase<Option>
// > = Omit<PublicBaseSelectProps<Option, IsMulti, Group>, StateManagedPropKeys> & Partial<PublicBaseSelectProps<Option, IsMulti, Group>>;

//PublicBaseSelectProps is basically every <select> props you can imagine React might use
//type StateManagedPropKeys = 'inputValue' | 'menuIsOpen' | 'onChange' | 'onInputChange' | 'onMenuClose' | 'onMenuOpen' | 'value';

//I think the Option generic thing eventually gets passed to "data" in OptionProps
//It looks like IsMulti gets used to type OnChangeValue return and PropsValue type (array or not)

//export interface GroupBase<Option> {
//  readonly options: readonly Option[];
//  readonly label?: string;
//}

export const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group>) => {
  return <ReactSelect {...props} />;
};

interface Option {
  id: number;
  label: string;
}

const guitarists: Option[] = [
  {
    id: 1,
    label: "Jimi Hendrix",
  },
  {
    id: 2,
    label: "Stevie Ray Vaughan",
  },
];

<>
  <Select
    options={guitarists}
    onChange={(option) => {
      // It should infer the type of option!
      // If isMulti is false, it should NOT be an array
      type test = Expect<Equal<typeof option, Option | null>>;
    }}
  />

  <Select
    options={guitarists}
    isMulti
    onChange={(option) => {
      // If isMulti is true, it should be an array
      type test = Expect<Equal<typeof option, readonly Option[]>>;
    }}
  />
</>;
