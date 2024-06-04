import { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

const Nav = ({ children }) => {
    let location = useLocation();
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (location.pathname === "/signin") {
            setIsShow(false);
        }
    }, []);

    return (
        <>
            {isShow === true && (
                <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            )}
        </>
    );
};

export default Nav;
