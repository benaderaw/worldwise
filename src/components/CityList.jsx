/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Loading from "./Loading";
import Message from "./Message";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Loading />;
  if (!cities.length) return <Message message={"No cities found"} />;

  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    </>
  );
}
