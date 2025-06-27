// hooks/useDarkMode.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const useDarkMode = () => {
  const dark = useSelector((state: RootState) => state.preferences.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
};

export default useDarkMode;
