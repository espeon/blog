"use client";

import { timeAgo } from "helpers/helpers";

export default function TimeAgo(props: {
  date: string;
  parentheses?: boolean;
}) {
  return (
    <span className="dark:text-gray-400 text-gray-700">
      {props.parentheses === true || props.parentheses === undefined ? "(" : ""}
      {timeAgo(props.date)}
      {props.parentheses === true || props.parentheses === undefined ? ")" : ""}
    </span>
  );
}
