export type PossibleVariants = "with-button" | "without-button";
/**
 * In this exercise, we'll look at an example where generics are NOT
 * needed.
 *
 * 1. Take a look at the ModalProps type. Try to figure out what's
 * going on in the type.
 *
 * Notice what type gets returned if you type:
 *
 * type Example = ModalProps<'with-button'>;
 * type Example2 = ModalProps<'without-button'>;
 *
 * 2. There's a way of writing this type (and the component!) without
 * generics that's much simpler. Try to figure out how to do that.
 */

export type ModalProps<TVariant extends PossibleVariants> = {
  isOpen: boolean;
  variant: TVariant;
} & (TVariant extends "with-button"
  ? {
    buttonLabel: string;
    onButtonClick: () => void;
  }
  : {});

export const Modal = <TVariant extends PossibleVariants>(
  props: ModalProps<TVariant>,
) => {
  // ...
  return null;
};

export type My_ModalProps = {
  isOpen: boolean;
} & ({
  variant: "without-button";
} | {
  variant: "with-button";
  buttonLabel: string,
  onButtonClick: () => void;
});

export const My_Modal = (props: My_ModalProps) => {
  return null;
};

export const Parent = () => {
  return (
    <>
      <My_Modal
        isOpen
        variant="with-button"
        buttonLabel="Click Me!"
        onButtonClick={() => { }}
      ></My_Modal>
      <My_Modal isOpen variant="without-button"></My_Modal>

      {/* @ts-expect-error */}
      <My_Modal isOpen variant="with-button"></My_Modal>

      <My_Modal
        isOpen
        variant="without-button"
        /* @ts-expect-error */
        onButtonClick={() => { }}
      />
    </>
  );
};
