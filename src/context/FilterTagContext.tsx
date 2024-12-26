import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
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
interface Value {
  setTagDetail(val: string): void;
  tag: string;
  tags: Tag[];
  active: number;
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  setTags: Dispatch<SetStateAction<Tag[]>>;
  setActive: Dispatch<SetStateAction<number>>;
}
const filterTag = createContext<Value>({
  tag: "",
  setTagDetail: () => "",
  tags: [],
  setTags: () => [],
  setActive: () => 1,
  setNotes: () => [],
  active: 1,
  notes: [],
});

function FilterTagContext({ children }: { children: ReactElement }) {
  const [tag, setTag] = useState<string>("");
  const [active, setActive] = useState<number>(1);
  const [tags, setTags] = useState([
    {
      title: "All Tags",
      id: 0,
    },
    {
      title: "Cooking",
      id: 1,
    },
    {
      title: "Dev",
      id: 2,
    },
    {
      title: "Fitness",
      id: 3,
    },
    {
      title: "Health",
      id: 4,
    },
    {
      title: "Personal",
      id: 5,
    },
    {
      title: "React",
      id: 6,
    },
    {
      title: "Recipes",
      id: 7,
    },
    {
      title: "Shopping",
      id: 8,
    },
    {
      title: "Travel",
      id: 9,
    },
    {
      title: "TypeScript",
      id: 10,
    },
  ]);
  const [notes, setNotes] = useState<Note[]>([]);

  function setTagDetail(val: string) {
    setTag(val);
  }

  return (
    <filterTag.Provider
      value={{
        setTagDetail,
        tag,
        active,
        setActive,
        setNotes,
        notes,
        tags,
        setTags,
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

// {
//   title: "React Performance Optimization",
//   tags: ["Dev", "React"],
//   date: "29 Oct 2024",
//   id: 1,
//   description: [],
//   archive: false,
// },
// {
//   title: "Japan Travel Planning",
//   tags: ["Travel", "Personal"],
//   date: "28 Oct 2024",
//   description: [],
//   id: 2,
//   archive: false,
// },
// {
//   title: "Favourite Pasta Recipes",
//   tags: ["Cooking", "Recipes"],
//   date: "27 Oct 2024",
//   description: [],
//   id: 3,
//   archive: false,
// },
// {
//   title: "Weekly Workout Plan",
//   tags: ["Dev", "React"],
//   date: "26 Oct 2024",
//   description: [],
//   id: 4,
//   archive: false,
// },
// {
//   title: "Meal Prep Ideas",
//   tags: ["Cooking", "Health", "Recipes"],
//   date: "25 Oct 2024",
//   description: [],
//   id: 5,
//   archive: false,
// },
// {
//   title: "Reading List",
//   tags: ["Personal", "Dev"],
//   date: "24 Oct 2024",
//   description: [],
//   id: 6,
//   archive: false,
// },
// {
//   title: "Fitness Goals 2025",
//   tags: ["Fitness", "Health", "Personal"],
//   date: "23 Oct 2024",
//   id: 7,
//   description: [],
//   archive: false,
// },
// {
//   title: "Learning",
//   tags: ["TypeScript", "React", "Personal"],
//   date: "24 Oct 2024",
//   id: 8,
//   description: [],
//   archive: true,
// },
// {
//   title: "Marketing",
//   tags: ["Recipes", "Shopping", "Personal"],
//   date: "25 Oct 2024",
//   id: 9,
//   description: [],
//   archive: true,
// },
