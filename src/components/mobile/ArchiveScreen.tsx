import { useFilterTag } from "@/context/FilterTagContext";
import { TbArchiveOff } from "react-icons/tb";
import DisplayNote from "../DisplayNote";
import { Button } from "../ui/button";
import { parseDate } from "@/lib/utils";

export default function ArchiveScreen() {
  const { notes, dispatch } = useFilterTag();
  let displayNote = notes.filter((note) => note.archive);
  displayNote = displayNote.sort((a, b) => {
    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return dateB - dateA;
  });
  function handleClick(): void {
    const sure = confirm("Are you sure you want to unarchive all your notes?");
    if (sure) return dispatch({ type: "unArchiveAll" });
  }
  return (
    <div className="h-full">
      {displayNote.length ? (
        <div className="flex justify-between items-center px-5 my-3">
          <h1 className="text-xl font-semibold text-current-1 ">
            Archive notes
          </h1>
          <Button
            onClick={() => handleClick()}
            className="bg-blue-600 text-zinc-100 hover:bg-blue-700"
          >
            Unarchive all Notes
          </Button>
        </div>
      ) : (
        ""
      )}
      <div className="px-5 h-full">
        {displayNote.length ? (
          displayNote.map((note) => <DisplayNote note={note} key={note.id} />)
        ) : (
          <div className="flex flex-col text-current-2 items-center h-[83vh] justify-center">
            <div className="text-3xl bg-active rounded-full p-3">
              <TbArchiveOff />
            </div>
            <p className="text-lg font-semibold">
              You don't have any archive notes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
