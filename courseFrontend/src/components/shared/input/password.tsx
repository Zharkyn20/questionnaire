import React, { useState } from "react";
import classNames from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Password = React.forwardRef<HTMLInputElement, Props>(function MyInput(
  { ...props },
  ref
) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleShowPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    setIsHidden(!isHidden);
  };

  return (
    <div>
      {props.label && (
        <label className="block mb-1 text-sm">{props.label}</label>
      )}
      <div className="relative rounded-md shadow-sm">
        <input
          type={isHidden ? "password" : "text"}
          className={classNames(
            "w-full bg-inputs px-3 py-2 border border-gray-200 rounded outline-none focus:border-primary transition text-sm relative pr-8",
            props?.error ? "border-red-500" : "border-gray-200"
          )}
          ref={ref}
          {...props}
        />
        {isHidden ? (
          <button
            className="absolute right-0 h-full px-3"
            onClick={handleShowPassword}
          >
            <HideIcon />
          </button>
        ) : (
          <button
            className="absolute right-0 h-full px-3"
            onClick={handleShowPassword}
          >
            <ShowIcon />
          </button>
        )}
      </div>
      <span className="text-red-500 text-xs">{props.error}</span>
    </div>
  );
});

function HideIcon() {
  return (
    <svg
      className="w-4 aspect-square"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Edit / Hide">
          <path
            id="Vector"
            d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
}

function ShowIcon() {
  return (
    <svg
      className="w-4 aspect-square"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Edit / Show">
          <g id="Vector">
            <path
              d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Password;
