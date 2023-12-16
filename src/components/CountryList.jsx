/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Loading from "./Loading";
import Message from "./Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Loading />;
  if (!cities.length) return <Message message={"No cities found"} />;

  const countries = Array.from(
    new Set(
      cities.map((city) => {
        return JSON.stringify({ country: city.country, emoji: city.emoji });
      })
    )
  ).map((country) => {
    return JSON.parse(country);
  });

  console.log(countries);

  return (
    <div className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </div>
  );
}
