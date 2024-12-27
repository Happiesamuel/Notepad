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

export const parseDate = (dateString: string): Date => {
  return new Date(
    dateString.replace(
      /(\d{2}) (\w{3}) (\d{4}), (\d{1,2}:\d{2}) (am|pm)/i,
      (_, day, month, year, time, period) => {
        const months: { [key: string]: number } = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        };
        const [hours, minutes] = time.split(":").map(Number);
        const adjustedHours =
          period.toLowerCase() === "pm" && hours !== 12
            ? hours + 12
            : period.toLowerCase() === "am" && hours === 12
            ? 0
            : hours;
        return `${year}-${months[month]}-${day}T${String(
          adjustedHours
        ).padStart(2, "0")}:${minutes}`;
      }
    )
  );
};
