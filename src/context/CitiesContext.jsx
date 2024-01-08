/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, useReducer } from "react";
import { createContext } from "react";

const citiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: [],
  mapPosition: [40, 0],
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    // case "cities/created":

    // case "cities/deleted":

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, mapPosition, error }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`http://localhost:8000/cities`);

        if (!res.ok)
          throw new Error("fetching api failed, something went wrong.");

        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
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
