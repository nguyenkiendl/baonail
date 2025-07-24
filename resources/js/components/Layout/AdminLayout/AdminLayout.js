import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import authService from "~/services/authService";
import { AppContext } from "~/context/AppContext";
import { scrollToTop } from "~/utils/activities";
const { Sider, Content } = Layout;
function AdminLayout({ children }) {
    const { user, userRole } = useContext(AppContext);
    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = authService.isAuthenticated();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const [current, setCurrent] = useState("admin-panel");
    useEffect(() => {
        setCurrent(location.pathname.slice(1));
    }, ["/"]);

    const [openKeys, setOpenKeys] = useState([]);
    useEffect(() => {
        setOpenKeys([]);
    }, [current]);

    var initialItems = {
        adminPanel: {
            key: "admin-panel",
            icon: <DashboardOutlined />,
            label: <Link to="/admin-panel">Bảng điều khiển</Link>,
        },
        moderatorPanel: {
            key: "moderator-panel",
            icon: <DashboardOutlined />,
            label: <Link to="/moderator-panel">Bảng điều khiển</Link>,
        },
        memberPanel: {
            key: "member-panel",
            icon: <DashboardOutlined />,
            label: <Link to="/member-panel">Bảng điều khiển</Link>,
        },
        user: {
            key: "user",
            icon: <UserOutlined />,
            label: <Link to="/admin-panel/user">User</Link>,
        },
    };
    const sideItems = [];
    useEffect(() => {
        if (userRole == "admin") {
            sideItems.push(initialItems.adminPanel);
            sideItems.push(initialItems.user);
        } else if (userRole == "moderator") {
            sideItems.push(initialItems.moderatorPanel);
        } else if (userRole == "member") {
            sideItems.push(initialItems.memberPanel);
        }
        setItems(sideItems);
    }, [user, userRole]);
    const handleClickSideMenu = (e) => {
        //console.log("click ", e);
        const { key, keyPath } = e;
        setCurrent(key);
        scrollToTop();
    };

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                breakpoint="xxl"
                //collapsedWidth="0"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={230}
                style={{
                    overflow: "auto",
                    height: "calc(100vh - 48px)",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    openKeys={openKeys}
                    onClick={handleClickSideMenu}
                    onOpenChange={handleOpenChange}
                    selectedKeys={[current]}
                    items={items}
                />
            </Sider>
            <Layout
                className="site-layout"
                style={{ marginLeft: collapsed ? 80 : 230 }}
            >
                <AdminHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "10px 8px",
                        padding: "0px 10px 0 10px",
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
