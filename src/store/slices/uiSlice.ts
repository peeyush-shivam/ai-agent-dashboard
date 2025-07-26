import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ModalState } from "../../types";

interface UIState {
  modals: ModalState;
  theme: "light" | "dark";
  searchQuery: string;
}

const initialState: UIState = {
  modals: {
    agentDetail: false,
    deleteConfirmation: false,
  },
  theme: "dark",
  searchQuery: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setModalState: (
      state,
      action: PayloadAction<{ modal: keyof ModalState; isOpen: boolean }>
    ) => {
      const { modal, isOpen } = action.payload;
      state.modals[modal] = isOpen;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setModalState, setTheme, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
