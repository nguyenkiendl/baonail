// Layouts
import AdminPanel from "~/views/Admin/AdminPanel";
import Category from "~/views/Admin/Category";
import MemberPanel from "~/views/Admin/MemberPanel";
import ModeratorPanel from "~/views/Admin/ModeratorPanel";
import Post from "~/views/Admin/Post";
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
    { path: "/admin-panel", component: AdminPanel },
    { path: "/admin-panel/profile", component: Profile },
    { path: "/admin-panel/user", component: User },
    { path: "/admin-panel/post-list", component: Post },
    { path: "/admin-panel/category", component: Category },
    { path: "/moderator-panel", component: ModeratorPanel },
    { path: "/member-panel", component: MemberPanel },
];

export { publicRoutes, privateRoutes };
