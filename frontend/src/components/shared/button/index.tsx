import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
  loading?: boolean;
}

function Button({
  variant = "contained",
  children,
  type = "button",
  loading,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      className={classNames(
        "px-3 py-1.5 rounded border border-primary transition relative",
        variant === "contained" && "bg-primary text-white hover:bg-primary/85",
        variant === "outlined" && "bg-white text-primary hover:bg-primary/5"
      )}
      disabled={loading || disabled}
    >
      {loading && (
        <div className="absolute left-0 right-0 mx-auto top-0 bottom-0 flex justify-center items-center">
          <Loading variant={variant} />
        </div>
      )}
      <div className={classNames(loading && "invisible")}>{children}</div>
    </button>
  );
}

function Loading({ variant }: { variant: "outlined" | "contained" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "none",
        display: "block",
        shapeRendering: "auto",
      }}
      width="20px"
      height="20px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        className={classNames(
          variant === "contained" && "stroke-white",
          variant === "outlined" && "stroke-primary"
        )}
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
}

export default Button;
