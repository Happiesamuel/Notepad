import { useFilterTag } from "@/context/FilterTagContext";
import DisplayNote from "../DisplayNote";
import { TbNotesOff } from "react-icons/tb";
import { parseDate } from "@/lib/utils";

export default function HomeScreen() {
  const { notes } = useFilterTag();
  let displayNote = notes.filter((note) => !note.archive);
  displayNote = displayNote.sort((a, b) => {
    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return dateB - dateA;
  });
  return (
    <div className="h-full">
      <div className="my-3 px-5 h-full ">
        {displayNote.length ? (
          displayNote.map((note) => <DisplayNote note={note} key={note.id} />)
        ) : (
          <div className="flex flex-col text-current-2 items-center h-full justify-center">
            <div className="text-3xl bg-active rounded-full p-3">
              <TbNotesOff />
            </div>
            <p className="text-lg font-semibold">You don't have any notes</p>
          </div>
        )}
      </div>
    </div>
  );
}
