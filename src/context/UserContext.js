import { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: "",
        account: {},
    });

    useEffect(() => {
        fetchUser();
    }, []);

    const loginContext = (userData) => {
        setUser(userData);
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let token = response.DT.access_token;
            let email = response.DT.email;
            let username = response.DT.username;
            let groupWithRoles = response.DT.groupWithRoles;
            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
            };
            setUser(data);
        }
    };

    return (
        <UserContext.Provider value={{ user, loginContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
