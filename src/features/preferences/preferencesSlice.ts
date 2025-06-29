import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Load dark mode from localStorage (SSR safe)
const isDarkStored =
  typeof window !== "undefined"
    ? localStorage.getItem("darkMode") === "true"
    : false;

// Define the structure of a favorite item
interface FavoriteItem {
  id: string;
  type: "news" | "movie" | "post";
  title: string;
  image?: string;
  description?: string;
}

interface PreferencesState {
  newsCategories: string[];
  movieGenres: number[];
  darkMode: boolean;
  favorites: FavoriteItem[];
}

const initialState: PreferencesState = {
  newsCategories: ["technology", "sports"],
  movieGenres: [28, 35],
  darkMode: isDarkStored,
  favorites: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", String(state.darkMode));
      }
    },

    // ✅ Store full object in favorites
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const exists = state.favorites.find(
        (fav) => fav.id === action.payload.id
      );
      if (exists) {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },

    setNewsCategories: (state, action: PayloadAction<string[]>) => {
      state.newsCategories = action.payload;
    },

    setMovieGenres: (state, action: PayloadAction<number[]>) => {
      state.movieGenres = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  toggleFavorite,
  setNewsCategories,
  setMovieGenres,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
