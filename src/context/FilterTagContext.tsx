import { date, tagList } from "@/lib/utils";
import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
} from "react";
type Note = {
  title: string;
  tags: string[];
  date: string;
  description: string[];
  id: number;
  archive: boolean;
};
type Tag = {
  title: string;
  id: number;
};
type State = {
  tag: string;
  active: number;
  tags: Tag[];
  notes: Note[];
  displayId: number | null;
  displayMobile: number;
  startNote: boolean;
  search: string;
  status: string;
};
interface Value {
  tag: string;
  tags: Tag[];
  active: number;
  displayId: number | null;
  displayMobile: number;
  startNote: boolean;
  notes: Note[];
  status: string;
  search: string;
  dispatch: Dispatch<{
    type: string;
    payload?: string | number | string[] | Tag | Note;
  }>;
}
const filterTag = createContext<Value>({
  tag: "All Tags",
  tags: [],
  active: 1,
  notes: [],
  displayId: null,
  startNote: false,
  search: "",
  displayMobile: 1,
  status: "home",
  dispatch: () => {},
});

function reducer(
  state: State,
  action: { type: string; payload?: string | number | string[] | Note | Tag }
): State {
  switch (action.type) {
    case "search":
      return { ...state, search: action.payload as string };
    case "getActive":
      return { ...state, active: action.payload as number };
    case "backShow":
      return { ...state, status: "home", displayMobile: 1 };
    case "getDisplayNote":
      return {
        ...state,
        displayId: action.payload as number,
        startNote: false,
        status: "show",
      };
    case "getMobileScreen":
      return {
        ...state,
        displayMobile: action.payload as number,
        status:
          action.payload === 1
            ? "home"
            : action.payload === 2
            ? "search"
            : action.payload === 3
            ? "archive"
            : "tags",
      };
    case "newTag":
      return {
        ...state,
        tags: [...state.tags, action.payload as Tag],
      };
    case "tagDetails":
      return { ...state, tag: action.payload as string };
    case "startFalse":
      return {
        ...state,
        startNote: false,
      };
    case "startTrue":
      return {
        ...state,
        startNote: true,
      };
    case "archiveNote":
      return {
        ...state,
        notes: state.notes.map((note) => {
          return note.id === state.displayId
            ? { ...note, archive: true }
            : { ...note, archive: note.archive };
        }),
      };
    case "unArchiveNote":
      return {
        ...state,
        notes: state.notes.map((note) => {
          return note.id === state.displayId
            ? { ...note, archive: false }
            : { ...note, archive: note.archive };
        }),
      };
    case "unArchiveAll":
      return {
        ...state,
        notes: state.notes.map((note) => {
          return { ...note, archive: false };
        }),
      };

    case "deleteNote":
      return {
        ...state,
        startNote: false,
        status: "home",
        notes: state.notes.filter((note) => note.id !== state.displayId),
      };
    case "createNote":
      return {
        ...state,
        startNote: false,
        notes: state.notes.map((note) => {
          return note.id === state.displayId
            ? { ...note, date: date(), description: action.payload as string[] }
            : { ...note, description: [...note.description] };
        }),
      };
    case "createNoteObj":
      return {
        ...state,
        displayId: state.notes.length * 2,
        status: "show",
        notes: [...state.notes, action.payload as Note],
      };
    default:
      throw new Error("Unknown action type");
  }
}

function FilterTagContext({ children }: { children: ReactElement }) {
  const storedNotes = localStorage.getItem("notes");
  const initialNotes = storedNotes ? JSON.parse(storedNotes) : [];
  const storedTags = localStorage.getItem("tags");
  const initialTags = storedTags ? JSON.parse(storedTags) : tagList;
  const initialState = {
    tag: "All Tags",
    active: 1,
    displayId: null,
    displayMobile: 1,
    status: "home",
    startNote: false,
    search: "",
    tags: initialTags,
    notes: initialNotes,
  };

  const [
    {
      notes,
      tag,
      tags,
      active,
      displayId,
      startNote,
      search,
      status,
      displayMobile,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, "notes"]);
  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags, "tags"]);

  return (
    <filterTag.Provider
      value={{
        displayMobile,
        search,
        status,
        tag,
        active,
        notes,
        tags,
        dispatch,
        displayId,
        startNote,
      }}
    >
      {children}
    </filterTag.Provider>
  );
}
function useFilterTag() {
  const context = useContext(filterTag);
  if (context === undefined) throw new Error("wrong position!!!");
  return context;
}

export { FilterTagContext, useFilterTag };
