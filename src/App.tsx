import Applayout from "./components/Applayout";
import { DarkmodeContext } from "./context/DarkMoContext";
import { FilterTagContext } from "./context/FilterTagContext";
import MobileLayout from "./components/mobile/MobileLayout";
import { useState } from "react";
import Loader from "./components/Loader";

export default function App() {
  const [load, setLoad] = useState(true);
  setTimeout(() => {
    setLoad(false);
  }, 3000);
  return (
    <DarkmodeContext>
      <FilterTagContext>
        <>
          {load && <Loader />}
          {!load && (
            <>
              <Applayout />
              <MobileLayout />
            </>
          )}
        </>
      </FilterTagContext>
    </DarkmodeContext>
  );
}
