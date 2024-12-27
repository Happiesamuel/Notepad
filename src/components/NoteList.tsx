import { Button } from "./ui/button";
import { useFilterTag } from "@/context/FilterTagContext";
import { CreateNote } from "./CreateNote";
import DisplayNote from "./DisplayNote";
import { useState } from "react";
import { parseDate } from "@/lib/utils";

export default function NoteList() {
  const { tag, active, notes, search } = useFilterTag();
  const [isOpen, setIsOpen] = useState(false);
  let displayNote = notes;
  if (tag && tag !== "All Tags")
    displayNote = notes.filter((note) => note.tags.includes(tag));
  if (tag === "All Notes") displayNote = notes ? notes : notes;
  if (active === 1)
    displayNote = displayNote.filter((note) => note.archive === false);
  if (active === 2)
    displayNote = displayNote.filter((note) => note.archive === true);
  if (search.length)
    displayNote = displayNote.filter(
      (note) =>
        note.title.startsWith(search) ||
        note.tags.includes(
          note?.tags
            ?.filter((x) => x.toLowerCase().startsWith(search))
            ?.at(0) || ""
        )
    );
  displayNote = displayNote.sort((a, b) => {
    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return dateB - dateA;
  });
  return (
    <div className="pt-3 px-4 border-r border-divide">
      <CreateNote isOpen={isOpen} setIsOpen={setIsOpen}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100"
        >
          + Create New Note
        </Button>
      </CreateNote>

      <div className="my-4 space-y-3 overflow-scroll no-scrollbar max-h-[80vh]">
        {displayNote.map((note) => (
          <DisplayNote note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
}
