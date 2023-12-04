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
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
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
    </AuthProvider>
  );
}

export default App;
