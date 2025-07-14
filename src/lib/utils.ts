import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const getTimeColor = (burnTime: number | null) => {
  if (!burnTime) return "text-green-400";
  if (burnTime > 60) return "text-green-400";
  if (burnTime > 30) return "text-yellow-400";
  return "text-red-400";
};
