import { createContext, useState, useEffect } from "react";
import storeUsers from "~/store/users";
export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userRole, setUserRole] = useState('receptionist');
    const [userViews, setuserViews] = useState([]);
    const [views, setViews] = useState([]);
    const [sales, setSales] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        storeUsers.profile().then((reponse) => {
            if (reponse) {
                setUser(reponse.user);
                setUsers(reponse.users);
                setRoles(reponse.roles);
                setViews(reponse.views);
                setSales(reponse.sales);
                setUserRole(reponse.user.role);
                setuserViews(reponse.user.views);
                setCategories(reponse.categories);
            }
        });
    }, []);
    const value = {
        user,
        users,
        roles,
        views,
        sales,
        userRole,
        userViews,
        categories,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
