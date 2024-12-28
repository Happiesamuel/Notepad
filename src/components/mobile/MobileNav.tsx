import { useDarkmode } from "@/context/DarkMoContext";
import { useFilterTag } from "@/context/FilterTagContext";
import { CiSun } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiMoon } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import { RiHome3Line } from "react-icons/ri";

export default function MobileNav() {
  const { isDarkmode, setDarkmode } = useDarkmode();
  const { dispatch, displayMobile } = useFilterTag();
  function handleClick(id: number): void {
    if (id === 5) return setDarkmode();
    return dispatch({ type: "getMobileScreen", payload: id });
  }
  const links = [
    {
      svg: <RiHome3Line />,
      id: 1,
      title: "Home",
    },
    {
      svg: <FaMagnifyingGlass />,
      id: 2,
      title: "Search",
    },
    {
      id: 3,
      title: "Archive",
      svg: <IoArchiveOutline />,
    },
    {
      id: 4,
      title: "Tags",
      svg: <GoTag />,
    },
    {
      id: 5,
      title: "Mode",
      svg: isDarkmode ? <CiSun className="text-3xl" /> : <FiMoon />,
    },
  ];
  return (
    <div className=" flex fixed w-full bottom-0 bg-background z-50 items-center  px-10 border-t border-divide">
      {links.map((link) => (
        <div
          key={link.id}
          className={`text-current-2 last:py-5 text-xl cursor-pointer w-full py-3 rounded-md flex items-center flex-col gap-1 ${
            link.id === displayMobile && "bg-active"
          }`}
          onClick={() => handleClick(link.id)}
        >
          {link.svg}
          <p className="hidden md:block text-sm">{link.title}</p>
        </div>
      ))}
    </div>
  );
}
