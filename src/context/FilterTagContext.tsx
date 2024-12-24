import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface Value {
  setTagDetail(val: string): void;
  tag: string;
  tags: {
    title: string;
    id: number;
  }[];
  active: number;
  notes: {
    title: string;
    tags: string[];
    date: string;
    id: number;
    archive: boolean;
  }[];
  setNotes: Dispatch<
    SetStateAction<
      {
        title: string;
        tags: string[];
        date: string;
        id: number;
        archive: boolean;
      }[]
    >
  >;
  setTags: Dispatch<
    SetStateAction<
      {
        title: string;
        id: number;
      }[]
    >
  >;
  setActive: Dispatch<SetStateAction<number>>;
}
// import { useLocalStorage } from "../features/hooks/useLocalstorage";
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
  const [notes, setNotes] = useState([
    {
      title: "React Performance Optimization",
      tags: ["Dev", "React"],
      date: "29 Oct 2024",
      id: 1,
      archive: false,
    },
    {
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2024",
      id: 2,
      archive: false,
    },
    {
      title: "Favourite Pasta Recipes",
      tags: ["Cooking", "Recipes"],
      date: "27 Oct 2024",
      id: 3,
      archive: false,
    },
    {
      title: "Weekly Workout Plan",
      tags: ["Dev", "React"],
      date: "26 Oct 2024",
      id: 4,
      archive: false,
    },
    {
      title: "Meal Prep Ideas",
      tags: ["Cooking", "Health", "Recipes"],
      date: "25 Oct 2024",
      id: 5,
      archive: false,
    },
    {
      title: "Reading List",
      tags: ["Personal", "Dev"],
      date: "24 Oct 2024",
      id: 6,
      archive: false,
    },
    {
      title: "Fitness Goals 2025",
      tags: ["Fitness", "Health", "Personal"],
      date: "23 Oct 2024",
      id: 7,
      archive: false,
    },
    {
      title: "Learning",
      tags: ["TypeScript", "React", "Personal"],
      date: "24 Oct 2024",
      id: 8,
      archive: true,
    },
    {
      title: "Marketing",
      tags: ["Recipes", "Shopping", "Personal"],
      date: "25 Oct 2024",
      id: 9,
      archive: true,
    },
  ]);

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
