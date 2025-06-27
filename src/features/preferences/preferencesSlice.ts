import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  categories: string[];
  darkMode: boolean;
  favorites: string[];
}

const initialState: PreferencesState = {
  categories: ["technology", "sports", "finance"],
  darkMode: false,
  favorites: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      if (state.categories.includes(action.payload)) {
        state.categories = state.categories.filter(
          (cat) => cat !== action.payload
        );
      } else {
        state.categories.push(action.payload);
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
});

export const { toggleCategory, toggleDarkMode, addFavorite, removeFavorite } =
  preferencesSlice.actions;

export default preferencesSlice.reducer;
