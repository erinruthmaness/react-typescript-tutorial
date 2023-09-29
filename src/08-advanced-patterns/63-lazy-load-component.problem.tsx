import React from "react";

//the componentType is what's generic, so constrain it to the kind of thing it is with `extends`
type Props<GenericComponentType extends React.ComponentType<any>> = {
  loader: () => Promise<{
    default: GenericComponentType; //the import isn't just a component - it's an object with a key of "default", and the value of that is the component
  }>;
} & React.ComponentProps<GenericComponentType>;

/**
 * 1. This component is supposed to take a loader function that returns a
 * component, and render that component when it's loaded.
 *
 * But it's not typed correctly, and it's not generic enough.
 * Fix the typing errors, and make it generic enough to support any component.
 *
 * Hints:
 *
 * - You'll need to make this a generic component!
 * - React.ComponentProps will come in handy, as will React.ComponentType
 */
//the generic componentType needs to be constrained here, too (use `extends`)
function LazyLoad<GenericComponentType extends React.ComponentType<any>>({
  loader,
  ...props
}: Props<GenericComponentType>) {

  const LazyComponent = React.useMemo(() => {
    return React.lazy(loader);
  }, [loader]);

  return (
    <React.Suspense fallback={"Loading..."}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
}

<>
  <LazyLoad loader={() => import("fake-external-component")} id="123" />

  <LazyLoad
    loader={() => import("fake-external-component")}
    // @ts-expect-error number is not assignable to string
    id={123}
  />

  {/* @ts-expect-error id is missing! */}
  <LazyLoad loader={() => import("fake-external-component")} />
</>;
