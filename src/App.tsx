import React from "react";
import Applayout from "./components/Applayout";
import { DarkmodeContext } from "./context/DarkMoContext";
import { FilterTagContext } from "./context/FilterTagContext";
import { NotexContext } from "./context/NoteComtext";

export default function App() {
  return (
    <DarkmodeContext>
      <FilterTagContext>
        <NotexContext>
          <Applayout />
        </NotexContext>
      </FilterTagContext>
    </DarkmodeContext>
  );
}
