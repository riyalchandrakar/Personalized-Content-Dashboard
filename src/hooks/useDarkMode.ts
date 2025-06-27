import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const useDarkMode = () => {
  const dark = useSelector((state: RootState) => state.preferences.darkMode);

  useEffect(() => {
    console.log("Dark Mode:", dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
};

export default useDarkMode;
