import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import ErrorHandler from "./pages/404";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
          console.log(cities);
        } catch {
          console.log("There is some error in loading the data... ");
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    },
    [setCities, setIsLoading]
  );

  return (
    <>
      <div>
        {/* <h1>Hello Router</h1> */}

        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              {/* this helps in mainitaining the url of the system  */}
              <Route
                path="cities"
                element={<CityList cities={cities} isLoading={isLoading} />}
              />
              <Route path="cities/:id" element={<City cities={cities} />} />
              <Route
                path="countries"
                element={
                  <CountryList countries={cities} isLoading={isLoading} />
                }
              />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<ErrorHandler />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
