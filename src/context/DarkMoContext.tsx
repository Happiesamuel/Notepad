import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
interface Value {
  setDarkmode(): void;
  isDarkmode: boolean;
}
// import { useLocalStorage } from "../features/hooks/useLocalstorage";
const Darkmode = createContext<Value>({
  isDarkmode: false,
  setDarkmode: () => null,
});
function DarkmodeContext({ children }: { children: ReactElement }) {
  const [isDarkmode, setIsDarkmode] = useState(false);
  //   useLocalStorage(
  //     window.matchMedia("(prefers-color-scheme: dark)").matches,
  //     "darkmode"
  //   );
  function setDarkmode() {
    setIsDarkmode(!isDarkmode);
  }
  useEffect(
    function () {
      if (isDarkmode) {
        document.documentElement.classList.add("dark");
      }

      return function () {
        document.documentElement.classList.remove("dark");
      };
    },
    [isDarkmode]
  );
  return (
    <Darkmode.Provider value={{ setDarkmode, isDarkmode }}>
      {children}
    </Darkmode.Provider>
  );
}
function useDarkmode() {
  const context = useContext(Darkmode);
  if (context === undefined) throw new Error("wrong position!!!");
  return context;
}

export { DarkmodeContext, useDarkmode };
