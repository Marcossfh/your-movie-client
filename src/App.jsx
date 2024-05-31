import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import MainMoviesPage from "./pages/MainMoviesPage";

import OnlyPrivate from "./components/OnlyPrivate";

import Navbar from "./components/Navbar"

function App() {
  

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main-movies-page" element={ <OnlyPrivate> <MainMoviesPage /> </OnlyPrivate>} />

        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App
