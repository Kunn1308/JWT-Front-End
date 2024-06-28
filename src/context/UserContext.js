import { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {},
    };
    const [user, setUser] = useState(userDefault);

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let token = response.DT.access_token;
            let email = response.DT.email;
            let username = response.DT.username;
            let groupWithRoles = response.DT.groupWithRoles;
            let data = {
                isLoading: false,
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
            };
            setUser(data);
        } else {
            setUser({ ...userDefault, isLoading: false });
        }
    };

    return (
        <UserContext.Provider value={{ user, loginContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
