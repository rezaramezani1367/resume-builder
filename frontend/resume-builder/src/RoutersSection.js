import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShowResume from "./components/ShowResume";

const RoutersSection = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/resume" element={<ShowResume />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer rtl />
    </>
  );
};

export default RoutersSection;
