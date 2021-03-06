import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import useToken from "./utils/useToken";
import Logout from './pages/Logout/Logout';
import Header from './components/Header';

function App() {
  const { token, setToken } = useToken()
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={token ? <Home /> : <Login setToken={setToken} />} />
          <Route path="/home" element={token ? <Home /> : <Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={token ? <Logout /> : <Login setToken={setToken} />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
