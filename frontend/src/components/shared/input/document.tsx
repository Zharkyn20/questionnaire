import useForwardRef from "@/utils/hooks/useForwardRef";
import classNames from "classnames";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  file: Blob | null;
  removeFile?: () => void;
  error?: string;
}

const Document = React.forwardRef<HTMLInputElement, Props>(function MyDocument(
  { removeFile, ...props }: Props,
  ref
) {
  const inputRef = useForwardRef<HTMLInputElement>(ref);

  const handleRemoveFile: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.files = null;
    }
    removeFile && removeFile();
  };

  return (
    <div>
      <div className="p-4 border-2 border-gray-200 rounded-lg border-dashed flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500">
            {props.file ? "File loaded" : "Upload your file"}
          </p>
          {
            <label
              className={classNames(
                "w-12 relative",
                !props.file && "cursor-pointer"
              )}
            >
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={inputRef}
                {...props}
                disabled={props.disabled || !!props.file}
              />
              {props.file ? (
                <div>
                  <DocIcon />
                  <button
                    className="w-4 absolute -top-1 -right-1"
                    onClick={handleRemoveFile}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ) : (
                <UploadIcon />
              )}
            </label>
          }
        </div>
      </div>
      <span className="text-red-500 text-xs">{props.error}</span>
    </div>
  );
});

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="stroke-primary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      className="fill-sky-500"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_iconCarrier">
        <path d="M17.5 0h-11c-1.104 0-2 0.895-2 2v28c0 1.105 0.896 2 2 2h19c1.105 0 2-0.895 2-2v-20zM25.5 10.829v0.171h-9v-9h0.172zM6.5 30v-28h8v11h11v17h-19z"></path>{" "}
      </g>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_iconCarrier">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="red"
          strokeWidth="1.5"
        ></circle>
        <path
          d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
          stroke="red"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
}

export default Document;
