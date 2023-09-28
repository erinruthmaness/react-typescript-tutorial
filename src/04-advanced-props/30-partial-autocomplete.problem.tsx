const presetSizes = {
  xs: "0.5rem",
  sm: "1rem",
};

type Size = keyof typeof presetSizes;

/**
 * In this exercise, we're using presetSizes to
 * provide a set of preset sizes for our Icon component.
 *
 * We want to allow users to pass in either a string, or
 * a Size. But there's an issue (see below).
 */

type LooseSize = Size | string;
//LooseSize is just inferred as any string
type ComputedSize = Size | (string & {});
//ComputedSize does an extra bit of compilation, which manages
//to force it to also compile Size correctly and to create the union type
// "xs" | "sm" | string - which allows for autocompletion
//this looks hacky but is actually the selected solution
//note that the React TS file actually uses this same trick for type AriaRole

export const Icon = (props: { size: ComputedSize; }) => {
  return (
    <div
      style={{
        width:
          props.size in presetSizes
            ? presetSizes[
            /**
             * The 'as' is necessary here because TS can't seem to narrow
             * props.size to Size properly
             */
            props.size as Size
            ]
            : props.size,
      }}
    />
  );
};

<>
  {/* Autocomplete for sm and xs are no longer working! */}
  {/* We want to have autocomplete for the 'size' while still being */}
  {/* able to pass any value. */}

  {/* 1. Try to find a way to express the type LooseSize in a way that */}
  {/* gives autocomplete for 'sm' and 'xs' while also letting the user */}
  {/* pass any value. */}
  <Icon size="sm"></Icon>
  <Icon size="xs"></Icon>
  <Icon size="10px"></Icon>
</>;

// This is a tough one! If you get stuck, jump right to the solution.
