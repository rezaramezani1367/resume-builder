import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import { Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RoutersSection = () => {
  return (
    <Container >
      <Routes>
        <Route path="/">
          <Route index element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer rtl />
    </Container>
  );
};

export default RoutersSection;
