import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Users from "../components/ManageUsers/Users";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = () => {
    const Projects = () => {
        return <div>Project</div>;
    };

    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route
                path="/users"
                element={<PrivateRoutes Component={Users} />}
            />
            <Route
                path="/projects"
                element={<PrivateRoutes Component={Projects} />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" errorElement={<h1>404 not found</h1>} />
        </Routes>
    );
};

export default AppRoutes;
