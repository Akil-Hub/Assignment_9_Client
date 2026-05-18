"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggler({ className }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className={`rounded-full relative ${className} bg-white text-black dark:text-white dark:bg-primary`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="icon"
    >
      <Sun className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
      <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 " />
    </Button>
  );
}