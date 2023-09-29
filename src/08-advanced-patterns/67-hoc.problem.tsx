import { Router, useRouter } from "fake-external-lib";

export const withRouter = <WrappedProps,>(Component: React.ComponentType<WrappedProps>) => {

  const NewComponent = (props: Omit<WrappedProps, "router">) => {
    const router = useRouter();
    return <Component {...props as WrappedProps} router={router} />;
  };

  NewComponent.displayName = `withRouter(${Component.displayName})`;

  return NewComponent;
};

const UnwrappedComponent = (props: { router: Router; id: string; }) => {
  return null;
};

const WrappedComponent = withRouter(UnwrappedComponent);

<>
  {/* @ts-expect-error needs a router! */}
  <UnwrappedComponent id="123" />

  {/* Doesn't need a router passed in! */}
  <WrappedComponent id="123" />

  <WrappedComponent
    // @ts-expect-error id must be the correct property
    id={123}
  />
</>;
