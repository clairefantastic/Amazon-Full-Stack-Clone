import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Switch } from "@mui/material";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

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
