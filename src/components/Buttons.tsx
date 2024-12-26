import React, { SetStateAction } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoArchiveOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { useNotes } from "@/context/NoteComtext";
import { useFilterTag } from "@/context/FilterTagContext";

export default function Buttons() {
  const { displayId } = useNotes();
  const { notes, setNotes } = useFilterTag();
  const findNote = notes.find((note) => note.id === displayId);
  const buttons = [
    {
      title: "Archived Note",
      id: 1,
      svg: <IoArchiveOutline />,
    },
    {
      title: "Delete Note",
      svg: <FaRegTrashCan />,
      id: 2,
    },
  ];

  function handleArchiveNote(id: number): SetStateAction<
    {
      title: string;
      tags: string[];
      date: string;
      id: number;
      description: string[];
      archive: boolean;
    }[]
  > | null | void {
    const sure = confirm(
      `Are you sure you want to ${id === 1 ? "archive" : "delete"} this note?`
    );
    return id === 1 && sure
      ? setNotes(
          notes.map((note) => {
            return note.id === displayId
              ? { ...note, archive: true }
              : { ...note, archive: note.archive };
          })
        )
      : id === 2 && sure
      ? setNotes(notes.filter((note) => note.id !== displayId))
      : null;
  }
  if (!findNote) return null;
  return (
    <div className="pt-3 px-4 border-l border-divide">
      <div className="space-y-3">
        {buttons.map((button) => (
          <Button
            onClick={() => handleArchiveNote(button.id)}
            key={button.id}
            className="flex justify-start hover:bg-blue-600 w-full gap-1 items-center border border-border-divide bg-transparent text-current-2"
          >
            <div>{button.svg}</div>
            <p>{button.title}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}
