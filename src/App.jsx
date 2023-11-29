import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import ErrorHandler from "./pages/404";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { CitiesProvider } from "./contexts/citiesContext";

function App() {
  return (
    <>
      <CitiesProvider>
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
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<ErrorHandler />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;
