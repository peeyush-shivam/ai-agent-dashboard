import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./slices/agentSlice";
import uiReducer from "./slices/uiSlice";
import workflowReducer from "./slices/workflowSlice";

export const store = configureStore({
  reducer: {
    agents: agentReducer,
    ui: uiReducer,
    workflow: workflowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
