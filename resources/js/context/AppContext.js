import { createContext, useState, useEffect } from "react";
import storeUsers from "~/store/users";
export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([]);
    const [userRole, setUserRole] = useState("receptionist");

    useEffect(() => {
        storeUsers.profile().then((reponse) => {
            if (reponse) {
                setUser(reponse.user);
                setRoles(reponse.roles);
                setUserRole(reponse.user.role);
            }
        });
    }, []);
    const value = {
        user,
        roles,
        userRole,
    };
    return (
        <AppContext.Provider value={value}> {children} </AppContext.Provider>
    );
};
