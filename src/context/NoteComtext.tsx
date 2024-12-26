import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface Value {
  setDisplayId: Dispatch<SetStateAction<number | null>>;
  displayId: number | null;
  startNote: boolean;
  setStartNote: Dispatch<SetStateAction<boolean>>;
}
const Notes = createContext<Value>({
  displayId: null,
  setDisplayId: () => null,
  startNote: false,
  setStartNote: () => false,
});
function NotexContext({ children }: { children: ReactElement }) {
  const [displayId, setDisplayId] = useState<number | null>(null);
  const [startNote, setStartNote] = useState(false);

  return (
    <Notes.Provider
      value={{ setDisplayId, displayId, startNote, setStartNote }}
    >
      {children}
    </Notes.Provider>
  );
}
function useNotes() {
  const context = useContext(Notes);
  if (context === undefined) throw new Error("wrong position!!!");
  return context;
}

export { NotexContext, useNotes };
