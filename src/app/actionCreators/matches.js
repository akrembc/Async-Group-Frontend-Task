import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../apis/axios";

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (tournamentId, controller) => {
    const requestData = {
      Interval: 5,
      MarketId: null,
      Mobile: true,
      TournamentId: tournamentId,
    };

    try {
      const res = await axios.post("/prematch/tournament", {
        ...requestData,
        signal: controller.signal,
      });

      return res.data;
    } catch (err) {
      console.error(
        `Failed to fetch matches of ID ${tournamentId}`,
        err.message
      );
    }
  }
);
