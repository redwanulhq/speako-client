import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ScrollToTop from "./Shared/ScrollToTop";
import Home from "./Pages/Home/Home";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import Login from "./Pages/LoginSystem/Login/Login";
import Products from "./Pages/Products/Products";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/LoginSystem/Register/Register";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import ProductsDetails from "./Pages/ProductsDetails/ProductsDetails";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";

function App() {
  const [appReloading, setAppReloading] = useState(true);
  useEffect(() => {
    setTimeout(() => setAppReloading(false), 3000);
  }, []);
  console.log(appReloading);
  if (appReloading) {
    return <div class="loading" data-loading-text="SPEAKO"></div>;
  }
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route exact path={["/", "/home"]}>
              <Home></Home>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Register></Register>
            </Route>
            <Route exact path="/products">
              <Products></Products>
            </Route>
            <Route exact path="/products/:id">
              <ProductsDetails></ProductsDetails>
            </Route>
            <PrivateRoute exact path="/place-order/:id/:quantity">
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
