
import './App.css'
import Navigation from "./assets/navigation/navigation.jsx";
import Home from "./assets/pages/home/Home.jsx"
import Favorites from "./assets/pages/favorites/Favorites.jsx"
import Questions from "./assets/pages/questions/Questions.jsx"
import Random from "./assets/pages/random/Random.jsx"
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
        <Navigation />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/random/" element={<Random />} />
            {/*<Route path="*" element={<NotFound/>}/>*/}
        </Routes>


    </>
  )
}

export default App
