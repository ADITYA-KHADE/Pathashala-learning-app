import React from "react";
import { useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Intro from "./pages/Intro"
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
import { useAuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import File from "./pages/File";

import "./App.css"
const App = () => {
  const { authUser } = useAuthContext();
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('/api/auth/getToken',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id:authUser._id}),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if(authUser){
      fetchData();
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/file/:id"
          element={authUser ? <File /> : <Navigate to="/login" />}
        />
        <Route
          path="/intro"
          element={<Intro/>}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
