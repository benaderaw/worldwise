/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import { setOptions } from "leaflet";

const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { position, getPosition } = useGeoLocation();

  // useEffect(() => {
  //   setMapPosition([position.lat, position.lng]);
  // }, [setMapPosition, position.lat, position.lng]);

  useEffect(() => {
    getPosition();
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities`);

        if (!res.ok)
          throw new Error("fetching api failed, something went wrong.");

        const data = await res.json();

        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, [setCities, setIsLoading]);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);

      if (!res.ok)
        throw new Error("fetching api failed, something went wrong.");

      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        mapPosition,
        setMapPosition,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

// hook
function useCities() {
  const context = useContext(citiesContext);

  if (context === undefined)
    throw new Error(
      "useContext must be used inside the cities context provider."
    );

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useCities, CitiesProvider };
