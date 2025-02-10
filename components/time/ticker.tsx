/* Heavily modified from https://github.com/bitttttten/mechanical-counter */

import React, {
  memo,
  useEffect,
  useCallback,
  useRef,
  useState,
  CSSProperties,
} from "react";

export interface AnimatedCounterProps {
  value?: number;
  incrementColor?: string;
  decrementColor?: string;
  includeDecimals?: boolean;
  decimalPrecision?: number;
  padNumber?: number;
  showColorsWhenValueChanges?: boolean;
  includeCommas?: boolean;
  containerStyles?: CSSProperties;
  digitStyles?: CSSProperties;
  className?: string;
}

export interface NumberColumnProps {
  digit: string;
  delta: string | null;
  incrementColor: string;
  decrementColor: string;
  digitStyles: CSSProperties;
  showColorsWhenValueChanges?: boolean;
}

export interface DecimalColumnProps {
  isComma: boolean;
  digitStyles: CSSProperties;
}

// Decimal element component
const DecimalColumn = ({ isComma, digitStyles }: DecimalColumnProps) => (
  <span className={`${isComma ? "ml-[-0.1rem]" : ""}`} style={digitStyles}>
    {isComma ? "," : "."}
  </span>
);

// Individual number element component
const NumberColumn = memo(
  ({
    digit,
    delta,
    incrementColor,
    decrementColor,
    digitStyles,
    showColorsWhenValueChanges,
  }: NumberColumnProps) => {
    const [position, setPosition] = useState<number>(0);
    const [animationClass, setAnimationClass] = useState<string | null>(null);
    const [movementType, setMovementType] = useState<
      "increment" | "decrement" | null
    >(null);
    const currentDigit = +digit;
    const previousDigit = usePrevious(+currentDigit);
    const columnContainer = useRef<HTMLDivElement>(null);

    const setColumnToNumber = useCallback(
      (number: string) => {
        if (columnContainer.current) {
          setPosition(
            columnContainer.current.clientHeight * parseInt(number, 10),
          );
        }
      },
      [columnContainer.current?.clientHeight],
    );

    useEffect(() => {
      setAnimationClass(previousDigit !== currentDigit ? delta : "");
      if (!showColorsWhenValueChanges) return;
      if (delta === "animate-moveUp") {
        setMovementType("increment");
      } else if (delta === "animate-moveDown") {
        setMovementType("decrement");
      }
    }, [digit, delta, previousDigit, currentDigit]);

    // reset movementType after 300ms
    useEffect(() => {
      if (movementType !== null)
        setTimeout(() => {
          setMovementType(null);
        }, 200);
    }, [movementType !== null, movementType]);

    useEffect(() => {
      setColumnToNumber(digit);
    }, [digit, setColumnToNumber]);

    if (digit === "-") {
      return <span>{digit}</span>;
    }

    return (
      <div className="relative overflow-hidden" ref={columnContainer}>
        <div
          className={`absolute w-full flex flex-col ${animationClass} ${
            animationClass ? "animate-move" : ""
          } transition-all duration-300 ease-in-out`}
          style={
            {
              transform: `translateY(-${position}px)`,
              "--increment-color": incrementColor,
              "--decrement-color": decrementColor,
              color: `var(--${movementType}-color)`,
            } as CSSProperties
          }
        >
          {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].reverse().map((num) => (
            <div className="flex justify-center items-center" key={num}>
              <span style={digitStyles}>{num}</span>
            </div>
          ))}
        </div>
        <span className="invisible">0</span>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta,
);

// Main component
const AnimatedCounter = ({
  value = 0,
  incrementColor = "#32cd32",
  decrementColor = "#fe6862",
  includeDecimals = true,
  decimalPrecision = 2,
  includeCommas = false,
  containerStyles = {},
  digitStyles = {},
  padNumber = 0,
  className = "",
  showColorsWhenValueChanges = true,
}: AnimatedCounterProps) => {
  const numArray = formatForDisplay(
    Math.abs(value),
    includeDecimals,
    decimalPrecision,
    includeCommas,
    padNumber,
  );
  const previousNumber = usePrevious(value);
  const isNegative = value < 0;

  let delta: string | null = null;

  if (previousNumber !== null) {
    if (value > previousNumber) {
      delta = "animate-moveUp"; // Tailwind class for increase
    } else if (value < previousNumber) {
      delta = "animate-moveDown"; // Tailwind class for decrease
    }
  }

  return (
    <div
      className={`relative flex flex-row flex-wrap transition-all duration-300 ${className}`}
      style={{ ...containerStyles }}
    >
      {/* If number is negative, render '-' feedback */}
      {isNegative && (
        <NumberColumn
          key={"negative-feedback"}
          digit={"-"}
          delta={delta}
          incrementColor={incrementColor}
          decrementColor={decrementColor}
          digitStyles={digitStyles}
          showColorsWhenValueChanges={showColorsWhenValueChanges}
        />
      )}
      {/* Format integer to NumberColumn components */}
      {numArray.map((number: string, index: number) =>
        number === "." || number === "," ? (
          <DecimalColumn
            key={index}
            isComma={number === ","}
            digitStyles={digitStyles}
          />
        ) : (
          <NumberColumn
            key={index}
            digit={number}
            delta={delta}
            incrementColor={incrementColor}
            decrementColor={decrementColor}
            digitStyles={digitStyles}
            showColorsWhenValueChanges={showColorsWhenValueChanges}
          />
        ),
      )}
    </div>
  );
};

const formatForDisplay = (
  number: number,
  includeDecimals: boolean,
  decimalPrecision: number,
  includeCommas: boolean,
  padTo: number = 0,
): string[] => {
  const decimalCount = includeDecimals ? decimalPrecision : 0;
  const parsedNumber = parseFloat(`${Math.max(number, 0)}`).toFixed(
    decimalCount,
  );
  const numberToFormat = includeCommas
    ? parseFloat(parsedNumber).toLocaleString("en-US", {
        minimumFractionDigits: includeDecimals ? decimalPrecision : 0,
      })
    : parsedNumber;
  return numberToFormat.padStart(padTo, "0").split("");
};

// Hook used to track previous value of primary number state in AnimatedCounter & individual digits in NumberColumn
const usePrevious = (value: number | null) => {
  const ref = useRef<number | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default AnimatedCounter;
