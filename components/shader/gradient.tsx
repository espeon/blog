"use client";
import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { useTheme } from "next-themes"; // or whatever theme solution you're using
import { Gradient } from "./wave";

const COLORS = {
  light: [0xf0abfc, 0xc084fc, 0xa5b4fc, 0x22d3ee],
  dark: [0x4a044e, 0x3b0764, 0x1e1b4b, 0x020617],
};

const COLORS_HEX = {
  light: ["#f0abfc", "#c084fc", "#a5b4fc", "#22d3ee"],
  dark: ["#4a044e", "#3b0764", "#1e1b4b", "#020617"],
};

type ColorScheme<T extends string[] | number[]> = {
  light: T;
  dark: T;
};

export function triggerOnIdle(callback: any) {
  if (window && "requestIdleCallback" in window) {
    return requestIdleCallback(callback);
  }
  return setTimeout(() => callback(), 1);
}

const GradientReact = () => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const gradientRef = useRef(null);
  const { theme } = useTheme(); // Get the current theme

  const colors = useMemo(() => COLORS, []);

  const getColors = <T extends string[] | number[]>(
    theme: "light" | "dark" | "system" | string = "system",
    col: ColorScheme<T> = COLORS as ColorScheme<T>,
  ): T => {
    let targetColors: T;

    if (theme === "system") {
      console.log("Theme is system!");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      targetColors = systemTheme.matches ? col.dark : col.light;
    } else {
      targetColors = theme === "dark" ? col.dark : col.light;
      console.log("Setting colors to", theme === "dark" ? "dark" : "light");
    }

    return targetColors;
  };

  const [isInitialized, setIsInitialized] = useState(false);
  const initColors = getColors(theme, COLORS_HEX);

  useEffect(() => {
    if (canvasRef.current && overlayRef.current && !isInitialized) {
      const initGradient = async () => {
        // initialise the gradient
        const gradient: any = new Gradient();
        await gradient.initGradient("#gradient-canvas");
        gradient.amp = 360;

        gradientRef.current = gradient;
        // we are done!
        setIsInitialized(true);

        // Fade out the black overlay
        if (overlayRef.current) {
          overlayRef.current.style.opacity = "0";
          setTimeout(() => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
          }, 1000);
        }
      };

      triggerOnIdle(initGradient);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized && gradientRef.current) {
      const gradient = gradientRef.current;
      // check if theme is system, if so, use system theme
      let targetColors: number[] = getColors(theme);
      // if we have colors then set them
      if (gradient?.sectionColors?.length > 0) {
        targetColors.forEach((targetColor, index) => {
          const [r, g, b] = [
            ((targetColor >> 16) & 255) / 255,
            ((targetColor >> 8) & 255) / 255,
            (targetColor & 255) / 255,
          ];
          gradient.sectionColors[index] = [r, g, b];
        });
        // set the base color
        gradient.uniforms.u_baseColor.value = gradient.sectionColors[0];
        // set the wave colors (offset by 1 to skip the base color)
        gradient.uniforms.u_waveLayers.value.forEach((layer, index) => {
          layer.value.color.value =
            gradient.sectionColors[index + 1] || gradient.sectionColors[index];
        });
      }
    }
  }, [theme, isInitialized, colors]);

  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed left-0 top-0 w-screen h-screen bg-neutral-200 dark:bg-neutral-900 transition-opacity duration-1000 -z-10`}
      />
      <canvas
        id="gradient-canvas"
        ref={canvasRef}
        style={
          {
            "--gradient-color-1": initColors[0],
            "--gradient-color-2": initColors[1],
            "--gradient-color-3": initColors[2],
            "--gradient-color-4": initColors[3],
          } as any
        }
        className="fixed left-0 top-0 bg-transparent h-screen w-screen bs-screen is-screen -z-20"
      />
    </>
  );
};

export default GradientReact;
