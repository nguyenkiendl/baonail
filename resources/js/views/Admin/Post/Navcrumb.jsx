import { Badge, Breadcrumb } from "antd";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "~/context/AppContext";
import { PANELS } from "~/utils/constants";

function Navcrumb() {
    const { panel } = useParams();
    const current = location.pathname;
    const { userRole } = useContext(AppContext);

    const routes = [
        {
            path: `/${userRole}-panel/post-list`,
            breadcrumbName: "Bài viết",
        },
        {
            path: `/${userRole}-panel/category`,
            breadcrumbName: "Danh mục",
        },
    ];
    return (
        <Badge.Ribbon text={userRole} color="volcano" className="ribbon-left">
            <section className="ant-breadcrumb-wrapper">
                <Breadcrumb>
                    {routes.map((route, index) => {
                        const isActive = route.path == current;
                        return (
                            <Breadcrumb.Item
                                key={index}
                                className={isActive ? "active" : ""}
                            >
                                <Link to={route.path}>
                                    {route.breadcrumbName}
                                </Link>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </section>
        </Badge.Ribbon>
    );
}

export default Navcrumb;
