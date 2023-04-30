import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/" element={<div>Chat</div>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
