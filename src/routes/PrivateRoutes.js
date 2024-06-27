import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const PrivateRoutes = ({ Component }) => {
    const { user } = useContext(UserContext);
    let navigate = useNavigate();
    useEffect(() => {
        console.log(user);
        let session = sessionStorage.getItem("account");
        if (!session) {
            navigate("/signin");
            window.location.reload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Component />;
};

export default PrivateRoutes;
