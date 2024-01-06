// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "../hooks/useParams";

// components
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../context/CitiesContext";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCities();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const { lat, lng } = useParams();
  const navigate = useNavigate();

  //
  const emoji = convertToEmoji(countryCode);

  // useEffect - get city data based on the lat and lng
  useEffect(() => {
    async function getCityData() {
      if (!lat && !lng) return;
      try {
        setIsLoadingGeocoding(false);
        setGeoCodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryName)
          throw new Error(
            "That doesn't seem to be a country, please click somewhere else"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);

        setIsLoadingGeocoding(true);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    getCityData();
  }, [lat, lng]);

  //
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !startDate) return;

    const newCity = {
      cityName,
      country,
      emoji,
      startDate,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map"} />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <>
      <form
        className={`${styles.form} ${isLoading ? styles.loading : ""}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>

          <DatePicker
            id="date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button onClick={handleSubmit} type="primary">
            Add
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            type="back"
          >
            &larr; Back
          </Button>
        </div>
      </form>
    </>
  );
}

export default Form;
