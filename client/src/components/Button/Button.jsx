import { twMerge } from "tailwind-merge";
export const Button = ({
  children,
  className,
  onClick = () => {},
  variant,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        variant
          ? "text-[#ff7e57] border-2 border-[#ff7e57]"
          : "bg-[#ff7e57] text-white",
        "uppercase shadow-lg py-2.5 text-lg rounded-md",
        className
      )}
    >
      {children}
    </button>
  );
};
