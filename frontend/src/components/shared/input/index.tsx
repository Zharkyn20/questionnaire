import React from "react";
import classNames from "classnames";
import Password from "./password";
import Document from "./document";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = Object.assign(
  React.forwardRef<HTMLInputElement, Props>(function MyInput(
    { ...props },
    ref
  ) {
    return (
      <div>
        {props.label && (
          <label className="block mb-1 text-sm">{props.label}</label>
        )}
        <div className="relative rounded-md shadow-sm">
          <input
            ref={ref}
            type="text"
            className={classNames(
              "w-full bg-inputs px-3 py-2 border border-gray-200 rounded outline-none focus:border-primary transition text-sm",
              props?.error ? "border-red-500" : "border-gray-200"
            )}
            {...props}
          />
        </div>
        <span className="text-red-500 text-xs">{props.error}</span>
      </div>
    );
  }),
  {
    Password,
    Document,
  }
);

export default Input;
