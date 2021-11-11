import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import useToken from "./utils/useToken";

function App() {
  const { token, setToken } = useToken()
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login setToken={setToken} />} />
          <Route path="/home" element={token ? <Home /> : <Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
