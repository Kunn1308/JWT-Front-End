import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const PrivateRoutes = ({ Component }) => {
    const { user } = useContext(UserContext);

    if (user && user.isAuthenticated === true) {
        return <Component />;
    } else {
        return <Navigate to="/signin" />;
    }
};

export default PrivateRoutes;
