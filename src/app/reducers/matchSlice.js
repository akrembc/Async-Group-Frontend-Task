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
      console.log(action.payload.Matches);
      const payload = action.payload.Matches.map((match) => {
        const bet = Object.keys(match.Markets).reduce((acc, curr) => {
          return Number(curr) < acc ? Number(curr) : acc;
        }, Infinity);
        return {
          date: fns.format(new Date(match.Md), "dd MMM"),
          time: fns.format(new Date(match.Md), "hh:mm"),
          homeTeam: match.Hn,
          awayTeam: match.An,
          1: match.Markets[bet][0].OddsValue,
          X: match.Markets[bet][2] ? match.Markets[bet][1].OddsValue : null,
          2: match.Markets[bet][match.Markets[bet].length - 1].OddsValue,
          oddsCount: match.C,
        };
      });

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
