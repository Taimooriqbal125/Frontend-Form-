import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home";
import Form from "../Pages/Form";
import Signin from "../Pages/Signin";
import Verifyotp from "../Pages/Verifyotp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/signin" element= /> */}
        <Route path="/verifyotp" element={<Verifyotp />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
