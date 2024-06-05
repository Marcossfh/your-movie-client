import "./App.css";
import { Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import MainMoviesPage from "./pages/MainMoviesPage";
import TerrorPage from "./pages/TerrorPage"
import SyfyPage from "./pages/SyfyPage"
import FichaMoviePage from "./pages/FichaMoviePage"
import CreateMoviePage from "./pages/CreateMoviePage"
import CommentPage from "./pages/CommentPage" 
import NotFound from "./pages/NotFound";
import EditMoviePage from "./pages/EditMoviePage";
import OnlyPrivate from "./components/OnlyPrivate";

import Navbar from "./components/Navbar"


/*<Route path="/create-movies-page" element={  <CreateMoviePage /> } />
import CreateMoviePage from "./pages/CreateMoviePage"*/

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
        <Route path="/main-movies-page" element={ <MainMoviesPage /> } />
        <Route path="/terror-page" element={  <TerrorPage /> } />
        <Route path="/syfy-page" element={  <SyfyPage /> } />
        <Route path="/ficha-movies-page/:movieId" element={  <FichaMoviePage /> } />
        <Route path="/create-movies-page" element={  <CreateMoviePage /> } />
        <Route path="/edit-movie/:movieId" element={  <EditMoviePage /> } />
        <Route path="/comment-page" element={ <CommentPage /> } />
        <Route path="*" element={ <NotFound />} />
        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App
