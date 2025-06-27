// hooks/useDarkMode.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const useDarkMode = () => {
  const darkMode = useSelector(
    (state: RootState) => state.preferences.darkMode
  );

  useEffect(() => {
    if (typeof darkMode !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      // Optional: store user's preference in localStorage
      localStorage.setItem("darkMode", String(darkMode));
    }
  }, [darkMode]);
};

export default useDarkMode;
