
import './App.css'
import Navigation from "./components/navigation/navigation.jsx";
import Home from "./pages/home/Home.jsx"
import Favorites from "./pages/favorites/Favorites.jsx"
import Questions from "./pages/questions/Questions.jsx"
import Random from "./pages/random/Random.jsx"
import Welcome from "./pages/welcome/Welcome.jsx";
import {Route, Routes} from "react-router-dom";
// import Musicplayer from "./components/MusicComponent/MusicComponent.jsx";

function App() {
// 6 components
  return (
    <>
        <Navigation />
        {/*<Musicplayer/>*/}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/random/" element={<Random />} />
            <Route path="/welcome" element={<Welcome />} />
            {/*<Route path="*" element={<NotFound/>}/>*/}
        </Routes>


    </>
  )
}

export default App
