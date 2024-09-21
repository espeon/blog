import clsx from "clsx";
import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col rounded-xl shadow-lg overflow-hidden border",
        "dark:border-neutral-700/75 border-neutral-200/75 bg-neutral-200/75 dark:bg-neutral-900/55 p-4 transition-all duration-300 hover:shadow-2xl",
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
