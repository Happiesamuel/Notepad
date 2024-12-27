import React from "react";
import Applayout from "./components/Applayout";
import { DarkmodeContext } from "./context/DarkMoContext";
import { FilterTagContext } from "./context/FilterTagContext";

export default function App() {
  return (
    <DarkmodeContext>
      <FilterTagContext>
          <Applayout />
      </FilterTagContext>
    </DarkmodeContext>
  );
}
