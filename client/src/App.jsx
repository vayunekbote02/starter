import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Register, NotFound, UserPage } from "./pages/exports.js";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
