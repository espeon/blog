"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import AnimatedCounter from "./ticker";

interface CurrentTimeProps {
  className?: string;
  displayMs?: boolean;
  msPrecision?: number;
}

const defaultProps: CurrentTimeProps = {
  className: "",
  displayMs: false,
  msPrecision: 0,
};

function getDate(timeZone: string) {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone,
    }),
  );
}

export default function CurrentTime({ ...props }: CurrentTimeProps) {
  const [time, setTime] = useState(getDate("America/Chicago"));
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      // get date in CST
      setTime(getDate("America/Chicago"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={clsx(
        "flex justify-center items-center font-mono",
        props.className,
      )}
    >
      <AnimatedCounter
        value={time.getHours()}
        className="font-mono inline"
        decimalPrecision={0}
        padNumber={2}
        showColorsWhenValueChanges={false}
      />
      :
      <AnimatedCounter
        value={time.getMinutes()}
        className="font-mono inline"
        decimalPrecision={0}
        padNumber={2}
        showColorsWhenValueChanges={false}
      />
      :
      <AnimatedCounter
        value={time.getSeconds()}
        className="font-mono inline"
        decimalPrecision={0}
        padNumber={2}
        showColorsWhenValueChanges={false}
      />
      {props.displayMs ? (
        <>
          .
          <AnimatedCounter
            value={time.getMilliseconds()}
            className="font-mono inline"
            decimalPrecision={props.msPrecision}
            padNumber={3}
            showColorsWhenValueChanges={false}
          />
        </>
      ) : null}
    </div>
  );
}
