import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";

type Nullable<T> = T | null;

interface Props {
  value: Option;
  onChange: (value: Option) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export type Option = Nullable<{
  id: number;
  name: string;
}>;

export default function Select({
  value,
  onChange,
  placeholder,
  options,
  label,
  error,
  disabled,
}: Props) {
  return (
    <div className="w-full relative">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            {label && (
              <p className="text-sm mb-1">{label}</p>
            )}
            <Listbox.Button
              className={classNames(
                "p-3 border rounded-[5px] w-full bg-inputs flex justify-between gap-4 items-center text-sm",
                open ? "border-orange" : "border-stroke",
                disabled && "cursor-default"
              )}
              aria-disabled={disabled}
            >
              <p className="line-clamp-1 max-w-full text-start">
                {value ? (
                  value.name
                ) : (
                  <span className="text-[#B3B6BA]">{placeholder}</span>
                )}
              </p>
              {!disabled && (
                <div
                  className={classNames(
                    `${
                      open ? "-rotate-90" : "rotate-90"
                    } transition aspect-square`
                  )}
                >
                  <ChevronRightIcon />
                </div>
              )}
            </Listbox.Button>
            {options?.length > 0 && (
              <div className="relative z-10">
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="p-5 grid gap-4 border border-stroke rounded-[5px] absolute top-[calc(100%+4px)] left-0 w-full bg-white">
                    {options.map((option) => (
                      <Listbox.Option
                        key={option?.id}
                        value={option}
                        className="cursor-pointer hover:text-orange text-sm"
                      >
                        {option?.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </>
        )}
      </Listbox>
      <p className="text-red-500 text-xs mt-1">{error}</p>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="h-2"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.45703 12.6567L6.59989 6.99959L1.45703 1.34245"
        fill="url(#paint0_linear_481_8418)"
      />
      <path
        d="M1.45703 12.6567L6.59989 6.99959L1.45703 1.34245"
        stroke={"#292930"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
