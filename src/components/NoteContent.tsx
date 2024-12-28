import { useFilterTag } from "@/context/FilterTagContext";
import { GoClock, GoTag } from "react-icons/go";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { Input } from "./ui/input";

export default function NoteContent() {
  const { notes, displayId, startNote, dispatch } = useFilterTag();
  const findNote = notes.find((note) => note.id === displayId);
  const [val, setVal] = useState<string>(
    findNote?.description.length ? findNote?.description.join("\n") : ""
  );
  const [value, setValue] = useState(findNote?.title);
  const [edit, setEdit] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
    return () => {
      if (input.current) {
        input.current.onfocus = null;
      }
    };
  }, [edit]);
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
  function handleEdit() {
    if (!value) return;
    dispatch({ type: "updateTitle", payload: value });
    setEdit(false);
  }
  if (!findNote) return;
  return (
    <div className="pt-3 px-4 relative">
      {!edit ? (
        <h1 className="font-semibold text-2xl text-current-1 flex items-end gap-2">
          {findNote?.title}{" "}
          <RiEdit2Line
            onClick={() => setEdit(true)}
            className="text-blue-600 text-base cursor-pointer"
          />
        </h1>
      ) : (
        <div className="flex gap-2 items-center">
          <Input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id="title"
            placeholder="Enter your note title..."
            className=" border-none text-current-2 w-[65%] font-semibold"
          />
          <Button
            onClick={() => handleEdit()}
            className="bg-blue-600 hover:bg-blue-700 text-zinc-100"
          >
            Save
          </Button>
        </div>
      )}
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
            <p key={note}>{note === "" ? "\u00A0" : note}</p>
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

      <div className="flex items-center gap-2 mt-4 absolute bottom-[2%] border-t w-[94%] pt-3 border-divide">
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
