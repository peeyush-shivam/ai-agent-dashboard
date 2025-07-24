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
    // Actions will be added here
  },
});

export default uiSlice.reducer;
