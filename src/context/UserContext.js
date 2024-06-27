import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: "",
        account: {},
    });

    const loginContext = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, loginContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
