/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";

const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
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

  //
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

  //
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if (!res.ok)
      //   throw new Error("fetching api failed, something went wrong.");

      const data = await res.json();

      console.log(data);

      setCities((cities) => [...cities, data]);

      // setCurrentCity(data);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  //
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) =>
        cities.filter((city) => {
          if (city.id !== id) return city;
        })
      );

      // setCurrentCity(data);
    } catch (error) {
      alert("There was an error deleting the city...");
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
        createCity,
        deleteCity,
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
