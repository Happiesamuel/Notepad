import React from "react";
import { Button } from "./ui/button";

export default function NoteList() {
  const notes = [
    {
      title: "React Performance Optimization",
      tags: ["Dev", "React"],
      date: "29 Oct 2024",
      id: 1,
    },
    {
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2024",
      id: 2,
    },
    {
      title: "Favourite Pasta Recipies",
      tags: ["Cooking", "Recipies"],
      date: "27 Oct 2024",
      id: 3,
    },
    {
      title: "Weekly Workout Plan",
      tags: ["Dev", "React"],
      date: "26 Oct 2024",
      id: 4,
    },
    {
      title: "Meal Prep Ideas",
      tags: ["Cooking", "Health", "Recipies"],
      date: "25 Oct 2024",
      id: 5,
    },
    {
      title: "Reading List",
      tags: ["Personal", "Dev"],
      date: "24 Oct 2024",
      id: 6,
    },
    {
      title: "Fitness Goals 2025",
      tags: ["Fitness", "Health", "Personal"],
      date: "23 Oct 2024",
      id: 7,
    },
  ];
  return (
    <div className="pt-3 px-4 border-r border-divide">
      <Button className="bg-blue-600 hover:bg-blue-700 text-zinc-100">
        + Create New Note
      </Button>

      <div className="my-4 space-y-3 overflow-scroll no-scrollbar max-h-[80vh]">
        {notes.map((note) => (
          <div className="flex flex-col gap-2" key={note.id}>
            <h1 className="text-lg text-current-1 leading-none">
              {note.title}
            </h1>
            <div className="flex items-center gap-2">
              {note.tags.map((tag) => (
                <p
                  className="text-sm bg-active text-current-2 px-2 rounded-md"
                  key={tag}
                >
                  {tag}
                </p>
              ))}
            </div>
            <p className="text-sm text-current-1">{note.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
