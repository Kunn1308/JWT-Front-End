import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PrivateRoutes = ({ Component }) => {
    let navigate = useNavigate();
    useEffect(() => {
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
