import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectMatches } from "../app/reducers/matchSlice";
import { fetchMatches } from "../app/actionCreators/matches";
import { selectTournament } from "../app/reducers/tournamentSlice";
import styles from "./MatchList.module.scss";

// select random buttons for custom stylings
// it got be done by state management later
// const arbitraryStyling = {
//   selectedButton: ;
// }

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
    <section className={styles.match__list__container}>
      {!matches && <p>Loading...</p>}

      <ul className={styles.match__list}>
        {matches &&
          matches.map((match, i) => {
            return (
              <li key={i} className={styles.match__item}>
                <div className={styles.match__details}>
                  <div className={styles.match__datetime}>
                    <small className={styles.match__date}>{match.date}</small>
                    <small className={styles.match__time}>{match.time}</small>
                  </div>
                  <span className={styles.match__teams}>
                    <span className={styles.match__home__team}>
                      {match.homeTeam}
                    </span>
                    <span className={styles.match__away__team}>
                      {match.awayTeam}
                    </span>
                  </span>
                </div>
                <span className={styles.match__bets}>
                  <ul className={styles.match__odds}>
                    <li data-oddName="1">
                      <button
                        // arbitrary choose a match to apply styling for button
                        data-btn-selected={`${i === 1 ? "true" : "false"}`}
                        className="btn"
                      >
                        {match["1"]}
                      </button>
                    </li>
                    {match.X && (
                      <li data-oddName="X">
                        <button
                          // arbitrary choose a match to apply styling for button
                          data-btn-increase={`${i === 2 ? "true" : "false"}`}
                          className="btn"
                        >
                          {i === 2 ? (
                            <i className="fa-solid fa-caret-up"></i>
                          ) : null}
                          {match["X"]}
                        </button>
                      </li>
                    )}
                    <li data-oddName="2">
                      <button
                        // arbitrary choose a match to apply styling for button
                        data-btn-decrease={`${i === 0 ? "true" : "false"}`}
                        className="btn"
                      >
                        {i === 0 ? (
                          <i className="fa-solid fa-caret-down"></i>
                        ) : null}
                        {match["2"]}
                      </button>
                    </li>
                  </ul>
                  <span className={styles["match__oddsCount"]}>
                    +{match.oddsCount}
                  </span>
                </span>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default MatchList;
