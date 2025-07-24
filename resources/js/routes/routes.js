// Layouts
import Dashboard from "~/views/Admin/Dashboard";
import User from "~/views/Admin/User";
import Profile from "~/views/Admin/User/Profile";
import Home from "~/views/Home";
import Login from "~/views/Login";

const publicRoutes = [
    //public routes
    { path: "/", component: Home },
    { path: "/login", component: Login },
];

const privateRoutes = [
    //private routes
    { path: "/admin-panel", component: Dashboard },
    { path: "/admin-panel/profile", component: Profile },
    { path: "/admin-panel/user", component: User },
    { path: "/moderator-panel", component: Dashboard },
    { path: "/member-panel", component: Dashboard },
];

export { publicRoutes, privateRoutes };
