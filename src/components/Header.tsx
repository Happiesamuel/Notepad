import { Input } from "./ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDarkmode } from "@/context/DarkMoContext";
import { Switch } from "@/components/ui/switch";
import { FiMoon } from "react-icons/fi";
import { CiSun } from "react-icons/ci";
import { useFilterTag } from "@/context/FilterTagContext";

export default function Header() {
  const { setDarkmode, isDarkmode } = useDarkmode();
  const { dispatch, search } = useFilterTag();
  return (
    <div className="flex justify-between items-center px-6 border-b border-divide ">
      <h1 className="text-xl text-current-1 ">All Notes</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg shadow shadow-shadow-input px-3  text-current-2">
          <FaMagnifyingGlass />
          <Input
            type="email"
            value={search}
            onChange={(e) =>
              dispatch({ type: "search", payload: e.target.value })
            }
            placeholder="Search by content or tags"
            className="border-none"
          />
        </div>
        <div className="flex items-center space-x-2 ">
          <CiSun className="text-3xl text-current-2" />
          <Switch onCheckedChange={() => setDarkmode()} checked={isDarkmode} />
          <FiMoon className="text-2xl text-current-2" />
        </div>
      </div>
    </div>
  );
}
