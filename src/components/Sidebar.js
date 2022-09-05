import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from "../apis/axios";
import useAxios from "../hooks/useAxios";
import styles from "./Sidebar.module.scss";
import {
  setTournament,
  selectTournament,
} from "../app/reducers/tournamentSlice";

const Sidebar = () => {
  const requestConfig = useMemo(
    () => ({
      axiosInstance,
      method: "POST",
      url: "/prematch/menu",
      requestConfig: {
        Interval: 5,
      },
    }),
    []
  );

  const [menuData, menuError, menuLoading] = useAxios(requestConfig);
  const [sportSelected, setSportSelected] = useState(0);
  const [countrySelected, setCountrySelected] = useState(-1);

  const dispatch = useDispatch();
  const tournamentId = useSelector(selectTournament);

  const icon = (sport) => {
    switch (sport) {
      case "Football":
        return <i className="fa-solid fa-futbol"></i>;
      case "Basketball":
        return <i className="fa-solid fa-basketball"></i>;
      case "Tennis":
        return <i className="fa-solid fa-table-tennis-paddle-ball"></i>;
      case "Volleyball":
        return <i className="fa-solid fa-volleyball"></i>;
      case "Ice Hockey":
        return <i className="fa-solid fa-hockey-puck"></i>;
      case "Handball":
        return <i className="fa-solid fa-baseball"></i>;
      case "Baseball":
        return <i className="fa-solid fa-baseball-bat-ball"></i>;
      case "American Football":
        return <i className="fa-solid fa-football"></i>;
      default:
        return <i className="fa-solid fa-ranking-star"></i>;
    }
  };

  const handleSportItemSelected = (e, i) => {
    e.preventDefault();
    if (i !== sportSelected) {
      setSportSelected(i);
      setCountrySelected(-1); // reset selected country
    } else {
      setSportSelected(-1);
    }
  };

  const handleCountryItemSelected = (e, i) => {
    e.preventDefault();
    i !== countrySelected ? setCountrySelected(i) : setCountrySelected(-1);
  };

  const handleTournamentItemSelected = (e, i, id) => {
    e.preventDefault();
    dispatch(setTournament(id));
  };

  const sports = (sportList) => {
    return sportList.map((sport, i) => (
      <li className={styles.sport__list__item} key={i}>
        <a
          href="/"
          className={styles.sport__toggle}
          data-selected={sportSelected === i}
          onClick={(e) => handleSportItemSelected(e, i)}
        >
          <span>
            {icon(sport.N)}
            {sport.N === "American Football" ? "Am. Football" : sport.N}
          </span>
          <span>
            {sport.C}
            <i className="fa-solid fa-caret-right"></i>
          </span>
        </a>
        <ul className={styles.country__list}>{countries(sport.Ct, i)}</ul>
      </li>
    ));
  };

  const countries = (countryList, sportIndex) => {
    return countryList.map((country, i) => {
      return (
        <li className={styles.country__list__item} key={i}>
          <a
            href="/"
            className={styles.country__toggle}
            data-selected={
              sportIndex === sportSelected && countrySelected === i
            }
            onClick={(e) => handleCountryItemSelected(e, i)}
          >
            <div className={styles.country__items}>
              <img
                src={`https://img.icons8.com/fluency/48/000000/${country.N.toLowerCase()}-circular.png`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://img.icons8.com/color/48/000000/globe--v1.png";
                }}
                alt="FLAG"
              />
              <p>{country.N}</p>
            </div>
            <span>{country.C}</span>
          </a>
          <ul className={styles.tournament__list}>
            {tournaments(country.Trn, i)}
          </ul>
        </li>
      );
    });
  };

  const tournaments = (tournamentList, countryIndex) => {
    return tournamentList.map((tournament, i) => {
      return (
        <li className={styles.tournament__list__item} key={i}>
          <a
            href="/"
            className={styles.tournament__toggle}
            data-selected={
              countryIndex === countrySelected && tournamentId === i
            }
            onClick={(e) => handleTournamentItemSelected(e, i, tournament.Id)}
          >
            <p>{tournament.N}</p>
          </a>
        </li>
      );
    });
  };

  return (
    <aside className={styles.sidebar}>
      {menuLoading && <p>Loading...</p>}

      {!menuLoading && menuError && <p className="errMsg">{menuError}</p>}

      <ul className={styles.sport__list}>
        {!menuLoading && !menuError && menuData?.S && sports(menuData.S)}
      </ul>

      {!menuLoading && !menuError && !menuData && <p>No matches to display</p>}
    </aside>
  );
};

export default Sidebar;
