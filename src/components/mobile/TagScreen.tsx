import { useFilterTag } from "@/context/FilterTagContext";
import DisplayNote from "../DisplayNote";
import AddTag from "../AddTag";
import { GoTag } from "react-icons/go";
import { parseDate } from "@/lib/utils";

export default function TagScreen() {
  const { notes, tags, tag: tagL, dispatch } = useFilterTag();
  let displayNote = notes;
  if (tagL && tagL !== "All Tags")
    displayNote = notes.filter((note) => note.tags.includes(tagL));
  if (tagL === "All Notes") displayNote = notes;
  displayNote = displayNote.sort((a, b) => {
    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return dateB - dateA;
  });
  return (
    <div className="px-5">
      <div className="flex items-center justify-between my-3">
        <h1 className="text-current-3 text-base font-semibold">Tags</h1>
        <AddTag />
      </div>
      <div className="flex flex-wrap gap-2 text-current-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => dispatch({ type: "tagDetails", payload: tag.title })}
            className={`text-sm cursor-pointer  px-2 rounded-md flex items-center ${
              tag.title === tagL ? "bg-blue-700 text-zinc-100" : "bg-active"
            } gap-1 text-current-2`}
          >
            <GoTag className="text-lg" />
            <p className="text-base ">{tag.title}</p>
          </div>
        ))}
      </div>
      {displayNote.length ? (
        <div className="my-3 ">
          {displayNote.map((note) => (
            <DisplayNote note={note} key={note.id} />
          ))}
        </div>
      ) : (
        <div className="text-current-1 text-base my-4">
          <p>
            Oops! There's no matching notes for{" "}
            <span className="font-semibold">"{tagL}"</span>
          </p>
        </div>
      )}
    </div>
  );
}
