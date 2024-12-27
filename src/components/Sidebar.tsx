import { useFilterTag } from "@/context/FilterTagContext";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { GoTag } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import AddTag from "./AddTag";

export default function Sidebar() {
  const links = [
    {
      title: "All Notes",
      svg: <RiHome3Line />,
      id: 1,
    },
    {
      title: "Archived Notes",
      id: 2,
      svg: <IoArchiveOutline />,
    },
  ];

  const { active, tags, dispatch } = useFilterTag();

  return (
    <div className="px-3 min-h-screen border-r border-divide pt-6">
      <div className="flex items-center gap-2 ">
        <FaCanadianMapleLeaf className="text-blue-700 text-3xl " />
        <h1 className="font-semibold text-2xl text-current-1 pacifico">
          Notes
        </h1>
      </div>

      <div className="flex flex-col text-current-1 gap-2 mt-8 border-b border-divide pb-3">
        {links.map((link) => (
          <div
            onClick={() => dispatch({ type: "getActive", payload: link.id })}
            key={link.id}
            className={`flex justify-between  items-center cursor-pointer px-3 py-2 ${
              link.id === active && "bg-active  rounded-lg"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`text-xl ${link.id === active && "text-blue-600"}`}
              >
                {link.svg}
              </div>
              <p className="text-base">{link.title}</p>
            </div>
            {link.id === active && (
              <MdKeyboardArrowRight className="text-current-1" />
            )}
          </div>
        ))}
      </div>

      <div className="mx-2 mt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-current-3 text-base">Tags</h1>
          <AddTag />
        </div>
        <div className="flex flex-col gap-1  text-zinc-800 max-h-[60vh] overflow-scroll no-scrollbar">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="text-current-2 flex items-center gap-2 cursor-pointer hover:bg-active py-2 rounded-md px-3"
              onClick={() =>
                dispatch({ type: "tagDetails", payload: tag.title })
              }
            >
              <GoTag className="text-lg" />
              <p className="text-base ">{tag.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
