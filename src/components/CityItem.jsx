/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const month = new Date(city.date).toLocaleString("default", {
    month: "long",
  });
  const date = new Date(city.date).getDate();
  const year = new Date(city.date).getFullYear();

  //
  function handleClick(e, id) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          city.id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{`(${month} ${date}, ${year})`}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleClick(e, city.id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
