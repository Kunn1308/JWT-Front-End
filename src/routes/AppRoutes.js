import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Users from "../components/ManageUsers/Users";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
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
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="*" errorElement={<h1>404 not found</h1>} />
        </Routes>
    );
};

export default AppRoutes;
