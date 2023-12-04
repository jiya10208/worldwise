import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: [
          ...state.cities.filter((city) => city.id !== action.payloadid),
        ],
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown error type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There is some error in loading the data... ",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is some error in loading the data... ",
      });
    }
  }
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "cities/created", payload: data });
    } catch {
      dispatch({
        type: "cities/loaded",
        payload: "There was an some error in ... ",
      });
    }
  }
  async function DeleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an some error in deleting the City ... ",
      });
    }
  }
  // async function DeleteCity(id) {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${BASE_URL}/cities/${id}`);
  //     const data = await res.json();
  //     console.log(data);
  //     const deletingCity = cities.filter((city) => city.id != id);
  //     console.log("Not DeletedCities", deletingCity);
  //     setCities(deletingCity);
  //   } catch {
  //     alert("There is some error in loading the data... ");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        countries: cities,
        currentCity,
        getCity,
        createCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("Cities Context used outside the citiesProvider ");
  return context;
}
export { CitiesProvider, useCities };
