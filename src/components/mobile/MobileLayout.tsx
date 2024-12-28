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
      <div className="overflow-scroll no-scrollbar h-full">
        {status === "home" && <HomeScreen />}
        {status === "search" && <SearchScreen />}
        {status === "archive" && <ArchiveScreen />}
        {status === "tags" && <TagScreen />}
        {status === "show" && <ShowNoteScreen />}
        <div className="fixed bottom-[13%] w-full flex justify-end px-4">
          <CreateNote isOpen={isOpen} setIsOpen={setIsOpen}>
            <div>
              <p
                onClick={() => setIsOpen(true)}
                className=" text-zinc-200  text-3xl  cursor-pointer p-2 px-4  rounded-full bg-blue-700"
              >
                +
              </p>
            </div>
          </CreateNote>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
