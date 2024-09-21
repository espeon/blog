"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalProps {
  paths: string[];
  children: ReactNode;
  defaultComponent: ReactNode;
}

export function Conditional({
  paths,
  children,
  defaultComponent,
}: ConditionalProps) {
  const pathname = usePathname();

  const isPathMatch = paths.some((path) => {
    // Convert both strings to lowercase for case-insensitive comparison
    const normalizedPath = path.toLowerCase();
    const normalizedPathname = pathname.toLowerCase();

    // Check if the pathname starts with the given path
    // This allows for matching nested routes as well
    const match = (normalizedPathname: string, normalizedPath: string) => {
      if (normalizedPath == "/") {
        return normalizedPathname === normalizedPath;
      } else {
        return normalizedPathname.startsWith(normalizedPath);
      }
    };
    return match(normalizedPathname, normalizedPath);
  });

  return isPathMatch ? <>{children}</> : <>{defaultComponent}</>;
}
