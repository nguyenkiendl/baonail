import {
    BarcodeOutlined,
    CarOutlined,
    CarryOutOutlined,
    CheckSquareOutlined,
    DashboardOutlined,
    DeleteRowOutlined,
    DownloadOutlined,
    FileProtectOutlined,
    FireTwoTone,
    FundTwoTone,
    InboxOutlined,
    OrderedListOutlined,
    PlusSquareFilled,
    SettingFilled,
    StarTwoTone,
    SwapRightOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import authService from "~/services/authService";
import { IconHotel, IconBbq, IconTent, IconTour, IconComboTour, IconComboTent, IconCoffee, IconBoat, IconMotobike } from "~/components/Icon";
import { AppContext } from "~/context/AppContext";
import { scrollToTop } from "~/utils/activities";
const { Sider, Content } = Layout;
function AdminLayout({ children }) {
    const { user, userRole, userViews, views } = useContext(AppContext);
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

    const [current, setCurrent] = useState("dashboard");
    useEffect(() => {
        setCurrent(location.pathname.slice(1));
    }, ['/']);

    const [openKeys, setOpenKeys] = useState([]);
    useEffect(() => {
        if (['farm-vu/utensil-stock', 'hotel-md/utensil-stock', 'hotel-dl/utensil-stock'].includes(current)) {
            setOpenKeys(['utensil']);
        } else if (['order-confirm-list', 'order-confirm'].includes(current)) {
            setOpenKeys(['confirm']);
        } else if (['ware-house-transfer', 'ware-receipt-transfer'].includes(current)) {
            setOpenKeys(['warehouse-transfer']);
        } else if (['ware-house-in', 'ware-receipt-in'].includes(current)) {
            setOpenKeys(['warehouse-in']);
        } else if (['ware-house-out', 'ware-receipt-out'].includes(current)) {
            setOpenKeys(['warehouse-out']);
        } else if (['vu-rest/stock', 'vu-water/stock', 'vu-room/stock'].includes(current)) {
            setOpenKeys(['vu-rest']);
        } else if (['md-rest/stock', 'md-rest-cake/stock', 'md-room/stock'].includes(current)) {
            setOpenKeys(['md-rest']);
        } else if (['dl-rest/stock', 'dl-room/stock'].includes(current)) {
            setOpenKeys(['dl-rest']);
        } else if (['hotel-md/check-room', 'hotel-dl/check-room', 'tent/check-tent'].includes(current)) {
            setOpenKeys(['check-room']);
        } else if (['hotel-md/room-setting', 'hotel-dl/room-setting', 'tent/room-setting'].includes(current)) {
            setOpenKeys(['room-setting']);
        } else if (current.includes('order-private')) {
            setOpenKeys(['order']);
        } else {
            setOpenKeys([]);
        }
    }, [current]);

    var initialItems = {
        dashboard: {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Bảng điều khiển</Link>,
        },
        user: {
            key: "user",
            icon: <UserOutlined />,
            label: <Link to="/user">User</Link>,
        },
        wareHouse: {
            key: "ware-house",
            icon: <FireTwoTone />,
            label: <Link to="/central/stock">Kho tổng</Link>,
        },
        utensil: {
            key: "utensil",
            icon: <BarcodeOutlined />,
            label: <Link to="/farm-vu/utensil-stock">Thiết bị</Link>,
            children: [
                {
                    key: "farm-vu/utensil-stock",
                    label: <Link to="/farm-vu/utensil-stock">Việt Úc Flower Graden</Link>,
                },
                {
                    key: "hotel-md/utensil-stock",
                    label: <Link to="/hotel-md/utensil-stock">Aurora Hotel Măng Đen</Link>,
                },
                {
                    key: "hotel-dl/utensil-stock",
                    label: <Link to="/hotel-dl/utensil-stock">Aurora Hotel Đà Lạt</Link>,
                }
            ]
        },
        booking: {
            key: "booking",
            icon: <PlusSquareFilled />,
            label: <Link to="/booking">Đặt dịch vụ</Link>,
        },
        periodic: {
            key: "periodic",
            icon: <OrderedListOutlined />,
            label: <Link to="/periodic">ĐX định kỳ</Link>,
        },
        orderConfirm: {
            key: "confirm",
            icon: <FileProtectOutlined />,
            label: <Link to="/order-confirm-list">Xác Nhận Dịch Vụ</Link>,
            children: [
                {
                    key: "order-confirm-list",
                    label: <Link to="/order-confirm-list">Dach sách xác nhận</Link>,
                },
                {
                    key: "order-confirm",
                    label: <Link to="/order-confirm">Phiếu xác nhận</Link>,
                },
            ]
        },
        order: {
            key: "order",
            icon: <OrderedListOutlined />,
            label: <Link to="/order">Dach sách dịch vụ</Link>,
        },
        orderCompleted: {
            key: "order-completed",
            icon: <StarTwoTone />,
            label: <Link to="/order-completed">DV đã hoàn thành</Link>,
        },
        orderReserve: {
            key: "order-reserve",
            icon: <CarryOutOutlined />,
            label: <Link to="/order-reserve">DV Bảo lưu</Link>,
        },
        wareHouseTransfer: {
            key: "warehouse-transfer",
            icon: <SwapRightOutlined />,
            label: <Link to="/ware-house-transfer">Xác Nhận Chuyển Kho</Link>,
            children: [
                {
                    key: "ware-house-transfer",
                    label: <Link to="/ware-house-transfer">Danh sách chuyển kho</Link>,
                },
                {
                    key: "ware-receipt-transfer",
                    label: <Link to="/ware-receipt-transfer">Phiếu chuyển kho</Link>,
                },
            ]
        },
        wareHouseIn: {
            key: "warehouse-in",
            icon: <DownloadOutlined />,
            label: <Link to="/ware-house-in">Xác Nhận Nhập Kho</Link>,
            children: [
                {
                    key: "ware-house-in",
                    label: <Link to="/ware-house-in">Danh sách nhập kho</Link>,
                },
                {
                    key: "ware-receipt-in",
                    label: <Link to="/ware-receipt-in">Phiếu nhập kho</Link>,
                },
            ]
        },
        wareHouseOut: {
            key: "warehouse-out",
            icon: <DeleteRowOutlined style={{ color: "red" }} />,
            label: <Link to="/ware-house-out">Xác Nhận Hủy NL</Link>,
            children: [
                {
                    key: "ware-house-out",
                    label: <Link to="/ware-house-out">Danh sách hủy NL</Link>,
                },
                {
                    key: "ware-receipt-out",
                    label: <Link to="/ware-receipt-out">Phiếu hủy NL</Link>,
                },
            ]
        },
        stockVU: {
            key: "vu-rest",
            icon: <InboxOutlined />,
            label: <Link to="/vu-rest/stock">Việt Úc Flower Graden</Link>,
            children: [
                {
                    key: "vu-rest/stock",
                    label: <Link to="/vu-rest/stock">Nhà hàng Việt Úc</Link>,
                },
                {
                    key: "vu-water/stock",
                    label: <Link to="/vu-water/stock">Nước Vườn Hoa</Link>,
                },
                {
                    key: "vu-room/stock",
                    label: <Link to="/vu-room/stock">Buồng phòng Glamping</Link>,
                },
            ]
        },
        stockMD: {
            key: "md-rest",
            icon: <InboxOutlined />,
            label: <Link to="/md-rest/stock">Aurora Măng Đen</Link>,
            children: [
                {
                    key: "md-rest/stock",
                    label: <Link to="/md-rest/stock">Nhà hàng Buffet Măng Đen</Link>,
                },
                {
                    key: "md-rest-cake/stock",
                    label: <Link to="/md-rest-cake/stock">Nhà hàng Bánh Ngọt Aurora</Link>,
                },
                {
                    key: "md-room/stock",
                    label: <Link to="/md-room/stock">Buồng phòng Măng Đen</Link>,
                },
            ]
        },
        stockDL: {
            key: "dl-rest",
            icon: <InboxOutlined />,
            label: <Link to="/dl-rest/stock">Aurora Đà Lạt</Link>,
            children: [
                {
                    key: "dl-rest/stock",
                    label: <Link to="/dl-rest/stock">Quầy live chào đón</Link>,
                },
                {
                    key: "dl-room/stock",
                    label: <Link to="/dl-room/stock">Buồng phòng Đà Lạt</Link>,
                },
            ]
        },
        checkRoom: {
            key: "check-room",
            icon: <CheckSquareOutlined />,
            label: <Link to="/hotel-md/check-room">KT Phòng</Link>,
            children: [
                {
                    key: "hotel-md/check-room",
                    label: <Link to="/hotel-md/check-room">KT phòng Măng Đen</Link>,
                },
                {
                    key: "hotel-dl/check-room",
                    label: <Link to="/hotel-dl/check-room">KT phòng Đà Lạt</Link>,
                },
                {
                    key: "tent/check-tent",
                    label: <Link to="/tent/check-tent">KT Lều</Link>,
                },
            ]
        },
        statistical: {
            key: "statistical",
            icon: <FundTwoTone />,
            label: <Link to="/statistical">Thống kê</Link>,
        },
        settingRoom: {
            key: "room-setting",
            icon: <SettingFilled />,
            label: <Link to="/hotel-md/room-setting">Cài Đặt Phòng</Link>,
            children: [
                {
                    key: "hotel-md/room-setting",
                    label: <Link to="/hotel-md/room-setting">Cài đặt Măng Đen</Link>,
                },
                {
                    key: "hotel-dl/room-setting",
                    label: <Link to="/hotel-dl/room-setting">Cài đặt  Đà Lạt</Link>,
                },
                {
                    key: "tent/room-setting",
                    label: <Link to="/tent/room-setting">Cài đặt Lều</Link>,
                },
            ]
        },
    };

    function renderIcon(icon) {
        switch (icon) {
            case 'hotel':
                return <IconHotel />
                break;
            case 'tour':
                return <IconTour />
                break;
            case 'combo-tour':
                return <IconComboTour />
                break;
            case 'tour-car':
                return <CarOutlined />
                break;
            case 'motobike':
                return <IconMotobike />
                break;
            case 'tent':
                return <IconTent />
                break;
            case 'combo-tent':
                return <IconComboTent />
                break;
            case 'bbq':
                return <IconBbq />
                break;
            case 'boat':
                return <IconBoat />
                break;
            case 'coffee':
                return <IconCoffee />
                break;
            default:
                break;
        }
    }

    const sideItems = [];
    sideItems.push(initialItems.dashboard);
    useEffect(() => {
        if (userRole && userViews) {
            if (userRole == 'admin') {
                sideItems.push(initialItems.user);
            }
            setItems(sideItems);
        }
    }, [user, userRole, userViews])
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
                    overflow: 'auto',
                    height: 'calc(100vh - 48px)',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
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
            <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 230 }}>
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
