import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Nav.scss";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { signOutUser } from "../../services/userService";
import { toast } from "react-toastify";
const NavHeader = () => {
    const { user, logoutContext } = useContext(UserContext);
    let location = useLocation();
    let navigate = useNavigate();
    const handleSignout = async () => {
        let res = await signOutUser();
        localStorage.removeItem("jwt");
        logoutContext();
        if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate("/");
        } else {
            toast.error(res.EM);
        }
    };
    if (
        (user && user.isAuthenticated === true) ||
        location.pathname === "/" ||
        location.pathname === "/about"
    ) {
        return (
            <>
                {/* <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div> */}
                <div className="nav-container">
                    <Navbar
                        expand="lg"
                        className="bg-body-tertiary"
                        bg="dark"
                        data-bs-theme="dark"
                    >
                        <Container>
                            <Navbar.Brand href="#home">
                                React-Bootstrap
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={NavLink} to="/">
                                        Home
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/users">
                                        Users
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/roles">
                                        Roles
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/projects">
                                        Projects
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/about">
                                        About
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ? (
                                        <>
                                            <Nav.Link as="div">
                                                Welcome{" "}
                                                <span className="username">
                                                    {user.account.username}
                                                </span>{" "}
                                                !
                                            </Nav.Link>
                                            <NavDropdown
                                                title={user.account.username}
                                                id="basic-nav-dropdown"
                                            >
                                                <NavDropdown.Item href="#action/3.1">
                                                    Change Password
                                                </NavDropdown.Item>

                                                <NavDropdown.Divider />
                                                <NavDropdown.Item
                                                    onClick={() =>
                                                        handleSignout()
                                                    }
                                                >
                                                    Sign out
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                    ) : (
                                        <>
                                            <Nav.Link as={NavLink} to="/signin">
                                                Signin
                                            </Nav.Link>
                                        </>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default NavHeader;
