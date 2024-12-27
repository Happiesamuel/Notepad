import { useFilterTag } from "@/context/FilterTagContext";
import { GoClock, GoTag } from "react-icons/go";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

export default function NoteContent() {
  const { notes, displayId, startNote, dispatch } = useFilterTag();
  const findNote = notes.find((note) => note.id === displayId);
  const [val, setVal] = useState<string>(
    findNote?.description.length ? findNote?.description.join("\n") : ""
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(
    function () {
      setVal(
        findNote?.description.length ? findNote?.description.join("\n") : ""
      );
    },
    [findNote?.description.length, findNote?.description]
  );
  const maxRows = 17;
  const lineHeight = 24;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = maxRows * lineHeight;
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  };
  function handleSubmit() {
    if (!val) return;
    const newVal: string[] = val.split("\n");
    dispatch({ type: "createNote", payload: [...newVal] });
  }
  if (!findNote) return;
  return (
    <div className="pt-3 px-4 ">
      <h1 className="font-semibold text-2xl text-current-1">
        {findNote?.title}
      </h1>
      <div className="mt-4 flex flex-col gap-2 border-b border-divide pb-3">
        <div className=" text-current-2 grid grid-cols-[0.4fr_1fr] items-center  ">
          <div className="flex items-center gap-2  text-sm">
            <GoTag className="text-lg" />
            <p className="text-base">Tags</p>
          </div>
          <p>{findNote?.tags.join(", ")}</p>
        </div>
        <div className=" text-current-2 grid  grid-cols-[0.4fr_1fr] items-center  ">
          <div className="flex items-center gap-2  text-sm">
            <GoClock className="text-lg" />
            <p className="text-base">Last edited</p>
          </div>
          <p>{findNote?.date}</p>
        </div>
      </div>

      {!startNote && (
        <div className="mt-3 text-current-2 text-sm overflow-scroll no-scrollbar h-[60vh]">
          {findNote?.description.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}
      {startNote && (
        <Textarea
          onChange={handleInput}
          rows={1}
          className="max-h-[700px] text-current-2 focus-visible:outline-none no-scrollbar focus:outline-none"
          value={val}
          ref={textareaRef}
          style={{ lineHeight: `${lineHeight}px` }}
        />
      )}

      <div className="flex items-center gap-2 mt-4">
        {!startNote && (
          <Button
            onClick={() => dispatch({ type: "startTrue" })}
            className="hover:bg-blue-600 bg-blue-700 text-zinc-100"
          >
            {findNote?.description.length ? "Edit note" : "Start note"}
          </Button>
        )}
        {startNote && (
          <Button
            onClick={() => handleSubmit()}
            className="hover:bg-blue-600 bg-blue-700 text-zinc-100"
          >
            Submit note
          </Button>
        )}
        {startNote && (
          <Button
            onClick={() => dispatch({ type: "startFalse" })}
            className="hover:bg-active bg-active text-current-2"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

// 10 Ways to Make Learning Numbers Fun and Engaging for Kids

// 1. Use music and movement. ...

// 2. Play guess the number. ...

// 3. Get hands-on with counting objects. ...

// 4. Make a number line. ...

// 5. Play store. ...

// 6. Create a number scavenger hunt. ...

// 7. Use interactive apps and games. ...

// 8. Build towers with blocks.
