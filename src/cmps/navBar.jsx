import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    const [dark, setDark] = useState(false);
    const switchMode = (ev) => {
        ev.preventDefault();
        setDark(!dark);
        document.body.classList.toggle("darkMode");
    }
    return (
        <div className="navBar">
            <h1 className="title">Nadav Weather Task</h1>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/favorites">Favorites</NavLink>
                <button onClick={switchMode}>{dark ? "Light" : "Dark"}</button>
            </div>
        </div>
    );
}