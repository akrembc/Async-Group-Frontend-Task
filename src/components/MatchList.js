import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectMatches } from "../app/reducers/matchSlice";
import { fetchMatches } from "../app/actionCreators/matches";
import { selectTournament } from "../app/reducers/tournamentSlice";

const MatchList = () => {
  const dispatch = useDispatch();
  // const dis = useMemo(() => dispatch, [dispatch])

  const matches = useSelector(selectMatches);
  const tournamentId = useSelector(selectTournament);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        dispatch(fetchMatches(tournamentId, controller)).unwrap();
      } catch (error) {
        console.log("failed to load matches");
      }
    })();
    return () => controller.abort();
  }, [dispatch, tournamentId]);

  return (
    <section>
      <h2>matches</h2>

      {!matches && <p>Loading...</p>}

      <ul>
        {matches &&
          matches.map((match, i) => {
            return (
              <li key={i}>
                <p>
                  <small>{match.date}</small>{" "}
                  <span>
                    {match.homeTeam} VS {match.awayTeam}
                  </span>{" "}
                  {match["1"]} / {match["X"]} / {match["2"]}
                </p>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default MatchList;
