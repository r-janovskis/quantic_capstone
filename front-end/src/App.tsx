import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";

import "./App.css";

function App() {
  return (
    <>
      {/* The Routes component is used to route the application */}
      <Routes>
        {/* The Root component is used as the root element of the application */}
        <Route path="/" element={<Root />}>
          {/* The Home component is used as the home page of the application */}
          <Route index element={<Home />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
