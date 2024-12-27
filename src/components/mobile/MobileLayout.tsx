import { useFilterTag } from "@/context/FilterTagContext";
import MobileHeader from "./MobileHeader";
import MobileNav from "./MobileNav";
import SearchScreen from "./SearchScreen";
import ArchiveScreen from "./ArchiveScreen";
import HomeScreen from "./HomeScreen";
import { CreateNote } from "../CreateNote";
import TagScreen from "./TagScreen";
import ShowNoteScreen from "./ShowNoteScreen";
import { useState } from "react";

export default function MobileLayout() {
  const { status } = useFilterTag();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden relative min-h-screen">
      <MobileHeader />
      <div className="overflow-scroll no-scrollbar h-[78vh]">
        {status === "home" && <HomeScreen />}
        {status === "search" && <SearchScreen />}
        {status === "archive" && <ArchiveScreen />}
        {status === "tags" && <TagScreen />}
        {status === "show" && <ShowNoteScreen />}
        <div className="absolute bottom-[13%] w-full flex justify-end px-4">
          <CreateNote isOpen={isOpen} setIsOpen={setIsOpen}>
            <div
              onClick={() => setIsOpen(true)}
              className="bg-blue-700 text-zinc-200 w-max text-3xl p-2 px-4 cursor-pointer pb-3  rounded-full"
            >
              +
            </div>
          </CreateNote>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
