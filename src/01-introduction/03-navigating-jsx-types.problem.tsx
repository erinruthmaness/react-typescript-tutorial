export const Component = () => {
  return (
    <div
      // How do I figure out what type aria-posinset expects?
      aria-posinset={99}
      // How do I figure out what type onChange expects? //number | undefined
      onChange={(event) => { console.log(event) }} //React.FormEventHandler<HTMLDivElement> | undefined

    // How do I get autocomplete with JSX? ..hover?
    //CTRL + Space 
    // or CTRL + click on "div"/component to go to where the type is defined
    />
  );
};

// type OnChangeType = React.FormEventHandler<HTMLDivElement> //FormEventHandler<T> | undefined;
// type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
// interface FormEvent<T = Element> extends SyntheticEvent<T> {
// type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];