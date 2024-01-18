/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
import { useAuth } from "../context/FakeAuthContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Loading from "./Loading";
import Message from "./Message";

export default function CityList() {
  const { isAuthenticated } = useAuth();
  const { cities, isLoading } = useCities();
  const navigate = useNavigate();

  // if (!isAuthenticated) return navigate("/login");

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
