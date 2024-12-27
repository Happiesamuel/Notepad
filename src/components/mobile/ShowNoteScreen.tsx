import { useFilterTag } from "@/context/FilterTagContext";
import { GoClock, GoTag } from "react-icons/go";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

export default function ShowNoteScreen() {
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

  function handleArchiveNote(): void {
    const sure = confirm(
      `Are you sure you want to ${
        findNote?.archive ? "unarchive" : "archive"
      } this note?`
    );
    if (sure && findNote?.archive === false)
      return dispatch({ type: "archiveNote" });
    if (sure && findNote?.archive === true)
      return dispatch({ type: "unArchiveNote" });
  }
  function handleDeleteNote(): void {
    const sure = confirm(`Are you sure you want to delete this note?`);
    if (sure) return dispatch({ type: "deleteNote" });
  }

  function handleSubmit() {
    if (!val) return;
    const newVal: string[] = val.split("\n");
    dispatch({ type: "createNote", payload: [...newVal] });
  }

  if (!findNote) return;
  return (
    <div className="pt-3 px-4 ">
      <div className="flex items-center justify-between gap-3 border-b border-divide py-3 mb-2">
        <div
          onClick={() => dispatch({ type: "backShow" })}
          className="flex items-center gap-1 text-current-2 cursor-pointer"
        >
          <MdOutlineKeyboardArrowLeft />
          <p>Go Back</p>
        </div>
        <div className="flex gap-5 items-center text-base text-current-2 cursor-pointer">
          <FaRegTrashCan onClick={() => handleDeleteNote()} />{" "}
          <IoArchiveOutline
            className={`${findNote.archive && "text-blue-600"}`}
            onClick={() => handleArchiveNote()}
          />{" "}
          <p onClick={() => dispatch({ type: "startFalse" })}>Cancel</p>{" "}
          {!startNote && (
            <p
              className="text-blue-600"
              onClick={() => dispatch({ type: "startTrue" })}
            >
              {findNote?.description.length ? "Edit note" : "Start note"}
            </p>
          )}
          {startNote && (
            <p className="text-blue-600" onClick={() => handleSubmit()}>
              Save Note
            </p>
          )}
        </div>
      </div>

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
    </div>
  );
}
