import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  newsCategories: string[];
  movieGenres: number[];
  darkMode: boolean;
  favorites: string[];
}

const initialState: PreferencesState = {
  newsCategories: ["technology", "sports"],
  movieGenres: [28, 35], // TMDB Genre IDs: Action, Comedy
  darkMode: false,
  favorites: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
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
