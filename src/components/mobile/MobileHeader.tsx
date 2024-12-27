import { FaCanadianMapleLeaf } from "react-icons/fa6";

export default function MobileHeader() {
  return (
    <div className="flex items-center gap-2 bg-active py-5 px-5">
      <FaCanadianMapleLeaf className="text-blue-700 text-3xl " />
      <h1 className="font-semibold text-2xl text-current-1 pacifico">Notes</h1>
    </div>
  );
}
