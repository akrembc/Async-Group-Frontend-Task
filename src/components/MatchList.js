import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectMatches } from "../app/reducers/matchSlice";
import { fetchMatches } from "../app/actionCreators/matches";
import { selectTournament } from "../app/reducers/tournamentSlice";
import OddsButton from "./ui/OddsButton";
import styles from "./MatchList.module.scss";

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
          matches.map((match, matchIndex) => {
            return (
              <li key={matchIndex} className={styles.match__item}>
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
                    {match.oddsList.map((odds, oddIndex) => {
                      return odds.ref !== "X" || odds.value ? (
                        <li
                          data-odds-name={odds.ref}
                          key={`${match.id}_${oddIndex}`}
                        >
                          <OddsButton
                            content={odds.value}
                            selected={false}
                            upDown={odds.upDown}
                          />
                        </li>
                      ) : null;
                    })}
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
