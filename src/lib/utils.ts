import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function date(): string {
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return formattedDate;
}
export const tagList = [
  {
    title: "All Tags",
    id: 0,
  },
  {
    title: "Cooking",
    id: 1,
  },
  {
    title: "Dev",
    id: 2,
  },
  {
    title: "Fitness",
    id: 3,
  },
  {
    title: "Health",
    id: 4,
  },
  {
    title: "Personal",
    id: 5,
  },
  {
    title: "React",
    id: 6,
  },
  {
    title: "Recipes",
    id: 7,
  },
  {
    title: "Shopping",
    id: 8,
  },
  {
    title: "Travel",
    id: 9,
  },
  {
    title: "TypeScript",
    id: 10,
  },
];
