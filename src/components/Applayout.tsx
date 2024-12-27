import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import { useDarkmode } from "@/context/DarkMoContext";

export default function Applayout() {
  const { isDarkmode } = useDarkmode();
  console.log(isDarkmode);
  return (
    <div className="w-full poppins min-h-screen grid grid-cols-[16rem_1fr] bg-background">
      <Sidebar />

      <div className="grid grid-rows-[4rem_1fr]">
        <Header />

        <Content />
      </div>
    </div>
  );
}
