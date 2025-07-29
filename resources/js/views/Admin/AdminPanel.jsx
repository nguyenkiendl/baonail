import { Breadcrumb, Typography } from "antd";
import PageHeader from "~/components/PageHeader";
const { Title } = Typography;
function AdminPanel() {
    return (
        <>
            <PageHeader title="Admin Panel page" />
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[{ title: <a href="/admin-panel">Admin Panel</a> }]}
            />
        </>
    );
}

export default AdminPanel;
