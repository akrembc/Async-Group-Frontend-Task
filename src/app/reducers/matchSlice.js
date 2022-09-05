import { createSlice } from "@reduxjs/toolkit";
import * as fns from "date-fns";

import { fetchMatches } from "../actionCreators/matches";

const initialState = {
  value: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed' | [id] : "loading"
  error: null,
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      state.status = "succeeded";
      const payload = action.payload.Matches.map((match) => ({
        date: fns.format(new Date(match.Md), "dd MMM yyyy"),
        homeTeam: match.Hn,
        awayTeam: match.An,
        1: match.Markets["50"][0].OddsValue,
        X: match.Markets["50"][1].OddsValue,
        2: match.Markets["50"][2].OddsValue,
      }));

      state.value = [...payload];
    });
    builder.addCase(fetchMatches.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchMatches.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const selectMatches = (state) => state.matches.value;
export const getMatchesStatus = (state) => state.matches.status;
export const getMatchesError = (state) => state.matches.error;

export default matchesSlice.reducer;
