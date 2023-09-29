type types = [React.ElementType, React.ComponentType];

/**
 * ElementType
 *
 * Lets you specify certain types of elements
 * which can receive those props.
 * > accepts props and derives what kind of components would receive those props
 *
 * For instance, Example accepts 'audio' and 'video'!
 * As well as ComponentType<P>
 * 
 */
//so, it's similar to React.ComponentType, but in this case you can see
//it types Example as any Element that can take the defined property or any custom component
export type Example = React.ElementType<{
  autoPlay?: boolean;
  // href: string
}>;

/**
 * ComponentType
 */
const FuncComponent = (props: { prop1: string }) => {
  return null;
};

class ClassComponent extends React.Component<{
  prop1: string;
}> {
  render(): React.ReactNode {
    this.props.prop1;
    return null;
  }
}

const tests2: Array<React.ComponentType<{ prop1: string }>> = [
  FuncComponent,
  ClassComponent,
];
