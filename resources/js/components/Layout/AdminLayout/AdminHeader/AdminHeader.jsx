import classNames from "classnames/bind";
import styles from "./AdminHeader.module.scss";
const cx = classNames.bind(styles);
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import authService from "~/services/authService";
import { AppContext } from "~/context/AppContext";

const { Header } = Layout;

function AdminHeader({ collapsed, setCollapsed }) {
    const { user } = useContext(AppContext);

    const navigage = useNavigate();
    const handleLogout = () => {
        authService
            .logout()
            .then((response) => {
                if (response.success) navigage("/login");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };

    return (
        <>
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            >
                {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                    }
                )}
            </Header>
            <div className={cx("nav-user")}>
                <Link to="/admin-panel/profile" key="profile">
                    <Button type="primary">{user.name}</Button>
                </Link>
                <Button onClick={handleLogout}>Thoát</Button>
            </div>
        </>
    );
}

export default AdminHeader;
