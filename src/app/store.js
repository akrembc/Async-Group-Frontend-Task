import { configureStore } from "@reduxjs/toolkit";

import matchesReducer from "./reducers/matchSlice";
import tournamentReducer from "./reducers/tournamentSlice";

export default configureStore({
  reducer: {
    matches: matchesReducer,
    tournament: tournamentReducer,
  },
});
