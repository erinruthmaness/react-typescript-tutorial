/**
 * We've got the same problem as the previous exercise, but this time we're
 * destructuring our props.
 *
 * 1. Figure out why the error on 'title' is happening.
 *
 * 2. Find a way to fix the error.
 */

type ModalProps =
  | {
      variant: "no-title";
      title?: never;
    }
  | {
      variant: "title";
      title: string;
    };

export const Modal = ({ variant, title }: ModalProps) => {
  if (variant === "no-title") {
    return <div>No title</div>;
  } else {
    return <div>Title: {title}</div>;
  }
};

export const Test = () => {
  return (
    <div>
      <Modal variant="title" title="Hello" />
      <Modal variant="no-title" />

      {/* @ts-expect-error */}
      <Modal />
      {/* @ts-expect-error */}
      <Modal
        variant="no-title"
        title="Oh dear"
      />
    </div>
  );
};
