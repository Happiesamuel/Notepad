import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "../ui/input";
import { useFilterTag } from "@/context/FilterTagContext";
import DisplayNote from "../DisplayNote";
import { parseDate } from "@/lib/utils";

export default function SearchScreen() {
  const { notes, search, dispatch } = useFilterTag();
  let displayNote = notes;
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
    <div className="px-5">
      <div className="flex items-center bg-active border border-divide rounded-md px-3 py-1 mt-3 text-current-2">
        <FaMagnifyingGlass />
        <Input
          value={search}
          onChange={(e) =>
            dispatch({ type: "search", payload: e.target.value })
          }
          placeholder="Search by content or tags"
          className="border-none"
        />
      </div>
      {search.length ? (
        <div className="text-current-1 text-base my-2">
          {displayNote.length ? (
            <p>
              All notes matching{" "}
              <span className="font-semibold">"{search}"</span>
              are displayed below.
            </p>
          ) : (
            <p>
              Oops! There's no matching notes for{" "}
              <span className="font-semibold">"{search}"</span>
            </p>
          )}
        </div>
      ) : (
        ""
      )}
      <div className="my-3 ">
        {displayNote.map((note) => (
          <DisplayNote note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
}
