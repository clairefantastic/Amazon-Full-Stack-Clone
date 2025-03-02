import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Switch } from "@mui/material";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Public key
const promise = loadStripe('pk_test_51QwaDw2cXmh6jegrkyHH1KwTMCgkeSIYM4Ugyn6hvaygIVSabuJClj1MJ0NMFi4estWQkmh5AB2YYs8YovPAqEaO00wNfkiCHz');

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // Will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>', authUser);
      if (authUser) {
        // The user just logged in / the user was logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // The user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    // BEM
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={
            <>
              <Header />
              <Checkout />
            </>
            }>
          </Route>
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
            }>
          </Route>
          <Route path="/orders" element={
              <>
              <Header />
              <Orders />
              </>
            }>
          </Route>
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
            }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
