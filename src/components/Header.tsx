import { Input } from "./ui/input";
import { IoSettingsOutline } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDarkmode } from "@/context/DarkMoContext";

export default function Header() {
  const { setDarkmode } = useDarkmode();
  return (
    <div className="flex justify-between items-center px-6 border-b border-divide ">
      <h1 className="text-xl text-current-1 " onClick={() => setDarkmode()}>
        All Notes
      </h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg shadow shadow-shadow-input px-3  text-current-2">
          <FaMagnifyingGlass />
          <Input
            type="email"
            placeholder="Search by content or tags"
            className="border-none"
          />
        </div>
        <IoSettingsOutline className="text-zinc-500 text-2xl" />
      </div>
    </div>
  );
}
