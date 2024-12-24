import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoArchiveOutline } from "react-icons/io5";
import { Button } from "./ui/button";

export default function Buttons() {
  const buttons = [
    {
      title: "Archived Note",
      id: 1,
      svg: <IoArchiveOutline />,
    },
    {
      title: "Delete Note",
      svg: <FaRegTrashCan />,
      id: 1,
    },
  ];
  return (
    <div className="pt-3 px-4 border-l border-divide">
      <div className="space-y-3">
        {buttons.map((button) => (
          <Button
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
