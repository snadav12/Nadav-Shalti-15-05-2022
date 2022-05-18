import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
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
                    <Route path="/Nadav-Shalti-15-05-2022" element={<Navigate to="/" />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;