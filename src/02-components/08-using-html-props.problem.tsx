import React from "react";

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;
export type ButtonPropsWithRef = React.ComponentProps<"button">;

export type OtherButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export type OtherButtonPropsWithRef = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> //adds ClassAttributes which is just a ref

export const Button = ({ className, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={`default-classname ${className}`}></button>
  );
};

const Parent = () => {
  return <Button onClick={() => { }} type="button"></Button>;
};
