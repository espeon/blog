import clsx from "clsx";
import { IconType } from "react-icons/lib";
interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  Icon: IconType;
  onClick?: () => void;
  ariaLabel?: string;
}

export const IconButton = (props: IconButtonProps) => {
  return (
    // tailwindcss button
    <div
      className={clsx(
        props.className,
        "flex items-center justify-center w-10 h-10 p-3 rounded-full transition-colors duration-150 bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700",
      )}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
    >
      <props.Icon />
    </div>
  );
};
