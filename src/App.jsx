import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/citiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";

// dist/assets/index-2df43940.css   32.73 kB │ gzip:   5.52 kB
// dist/assets/index-c07220f2.js   532.00 kB │ gzip: 150.19 kB

// import Product from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import ErrorHandler from "./pages/404";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const ErrorHandler = lazy(() => import("./pages/404"));

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";

import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
