import React from "react";
import Applayout from "./components/Applayout";
import { DarkmodeContext } from "./context/DarkMoContext";

export default function App() {
  return (
    <DarkmodeContext>
      <Applayout />
    </DarkmodeContext>
  );
}
