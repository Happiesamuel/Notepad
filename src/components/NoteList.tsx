import { Button } from "./ui/button";
import { useFilterTag } from "@/context/FilterTagContext";
import { CreateNote } from "./CreateNote";

export default function NoteList() {
  const { tag, active, notes, dispatch, search } = useFilterTag();
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

  return (
    <div className="pt-3 px-4 border-r border-divide">
      <CreateNote>
        <Button className="bg-blue-600 hover:bg-blue-700 text-zinc-100">
          + Create New Note
        </Button>
      </CreateNote>

      <div className="my-4 space-y-3 overflow-scroll no-scrollbar max-h-[80vh]">
        {displayNote.map((note) => (
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() =>
              dispatch({ type: "getDisplayNote", payload: note.id })
            }
            key={note.id}
          >
            <h1 className="text-lg text-current-1 leading-none">
              {note.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
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
