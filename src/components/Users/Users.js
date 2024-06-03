import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Users(props) {
    let navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            navigate("/signin");
        }
    }, []);
    return <div>user component</div>;
}

export default Users;
