/* eslint-disable react/prop-types */
import { useEffect, useContext, useReducer } from "react";
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
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => {
          if (city.id !== action.payload) return city;
        }),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "map/position":
      return { ...state, mapPosition: action.payload };

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
          payload: "There was an error loading cities...",
        });
      }
    }

    fetchCities();
  }, []);

  //
  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities/${id}`);

      if (!res.ok)
        throw new Error("fetching api failed, something went wrong.");

      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }

  //
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
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

      dispatch({ type: "city/created", payload: data });
      // setCurrentCity(data);
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  //
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });

      // setCurrentCity(data);
    } catch (error) {
      alert("There was an error deleting the city...");
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
        createCity,
        deleteCity,
        dispatch,
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
