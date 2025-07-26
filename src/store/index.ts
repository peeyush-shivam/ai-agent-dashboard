import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./slices/uiSlice";
import agentReducer from "./slices/agentSlice";
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
