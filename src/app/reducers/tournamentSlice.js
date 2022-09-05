import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: 1,
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournament: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setTournament } = tournamentSlice.actions;

export const selectTournament = (state) => state.tournament.selected;

export default tournamentSlice.reducer;
