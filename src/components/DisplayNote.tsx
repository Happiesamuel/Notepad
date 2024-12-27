import { useDarkmode } from "@/context/DarkMoContext";
import { useFilterTag } from "@/context/FilterTagContext";
type Note = {
  title: string;
  tags: string[];
  date: string;
  description: string[];
  id: number;
  archive: boolean;
};

export default function DisplayNote({ note }: { note: Note }) {
  const { isDarkmode } = useDarkmode();
  const { dispatch, displayId } = useFilterTag();
  return (
    <div
      className={`flex flex-col gap-2 cursor-pointer last:border-none py-3 border-b border-divide ${
        note.id === displayId && "bg-active rounded-md p-2"
      }`}
      onClick={() => dispatch({ type: "getDisplayNote", payload: note.id })}
      key={note.id}
    >
      <h1 className="text-lg font-semibold text-current-1 leading-none">
        {note.title}
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        {note.tags.map((tag) => (
          <p
            className={`text-sm   px-2 rounded-md ${
              isDarkmode
                ? "bg-zinc-600 text-zinc-100"
                : "bg-zinc-300 text-zinc-600"
            }`}
            key={tag}
          >
            {tag}
          </p>
        ))}
      </div>
      <p className="text-sm text-current-1">{note.date}</p>
    </div>
  );
}
