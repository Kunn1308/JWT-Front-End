import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";

const Nav = ({ children }) => {
    return (
        <div className="topnav">
            <Link className="active" to="/">
                Home
            </Link>
            <Link to="/news">News</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
        </div>
    );
};

export default Nav;
