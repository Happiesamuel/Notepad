import React from "react";
import NoteList from "./NoteList";
import Buttons from "./Buttons";
import NoteContent from "./NoteContent";

export default function Content() {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.4fr] ">
      <NoteList />
      <NoteContent />
      <Buttons />
    </div>
  );
}
