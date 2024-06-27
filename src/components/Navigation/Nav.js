import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";
import { UserContext } from "../../context/UserContext";

const Nav = () => {
    const { user } = useContext(UserContext);
    let location = useLocation();
    if ((user && user.isAuthenticated === true) || location.pathname === "/") {
        return (
            <>
                <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default Nav;
