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
                setUserRole(reponse.user.role);
                setRoles(reponse.roles);
            }
        });
    }, []);
    const value = {
        user,
        userRole,
        roles,
    };
    return (
        <AppContext.Provider value={value}> {children} </AppContext.Provider>
    );
};
