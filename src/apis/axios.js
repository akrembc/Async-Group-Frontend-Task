import axios from "axios";

const BASE_URL = "https://sportsbook-api.teamasync.org/api";

const fetchHeaders = {
  SiteId: 1,
  Lang: "en",
  Accept: "*/*",
  "Content-Type": "application/json",
};

export default axios.create({
  baseURL: BASE_URL,
  headers: fetchHeaders,
});
