import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./cmps/navBar";
import Favorites from "./pages/favorites";
import Weather from "./pages/weather";

function App() {
    return (
        <Router>
            <div className="app">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Weather />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;