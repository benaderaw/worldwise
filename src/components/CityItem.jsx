/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";

export default function CityItem({ city }) {
  const month = new Date(city.date).toLocaleString("default", {
    month: "long",
  });
  const date = new Date(city.date).getDate();
  const year = new Date(city.date).getFullYear();

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{city.emoji}</span>
      <h3 className={styles.name}>{city.cityName}</h3>
      <time className={styles.date}>{`(${month} ${date}, ${year})`}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
