import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";

export default function Applayout() {
  return (
    <div className="w-full  poppins min-h-screen hidden lg:grid grid-cols-[16rem_1fr] bg-background">
      <Sidebar />
      <div className="grid grid-rows-[4rem_1fr]">
        <Header />
        <Content />
      </div>
    </div>
  );
}
