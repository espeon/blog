"use client";

import { timeAgo } from "helpers/helpers";

export default function TimeAgo(props: {date: string}) {
    return (
        <span className="dark:text-gray-400 text-gray-700">
        ({timeAgo(props.date)})
        </span>
    )
    }