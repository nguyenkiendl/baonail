// Layouts
import Dashboard from "~/views/Dashboard";
import Home from "~/views/Home";
import Login from "~/views/Login";

const publicRoutes = [
    //public routes
    { path: "/", component: Home },
    { path: "/login", component: Login },
];

const privateRoutes = [
    //private routes
    { path: "/dashboard", component: Dashboard },
];

export { publicRoutes, privateRoutes };
