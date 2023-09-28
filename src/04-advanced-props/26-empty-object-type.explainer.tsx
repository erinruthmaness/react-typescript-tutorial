const Component = (props: { config: {}; }) => {
  return <div />;
};

/**
 * Why can I pass _anything_ to config?
 * A: empty object is a special type in TS which represents anything with 0 or more properties (aka everything that isn't null or undefined)
 * in order to make sure it's an empty object, change {} to Record<string, never>
 */
<>
  <Component
    config={{
      foo: "bar",
      whatever: {},
    }}
  />
</>;
