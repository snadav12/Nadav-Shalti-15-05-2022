import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navBar">
            <h1 className="title">Nadav Weather Task</h1>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/favorites">Favorites</NavLink>
            </div>
        </div>
    );
}