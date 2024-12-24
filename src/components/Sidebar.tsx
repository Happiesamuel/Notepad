import React, { useState } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { GoTag } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";

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
  const tags = [
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
  ];
  const [active, setActive] = useState(1);
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
            onClick={() => setActive(link.id)}
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
        <h1 className="text-current-3 text-base">Tags</h1>
        <div className="flex flex-col gap-3 mt-4 text-zinc-800">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="text-current-2 flex items-center gap-2"
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
