import { Breadcrumb, Typography } from "antd";
import PageHeader from "~/components/PageHeader";
const { Title } = Typography;
function MemberPanel() {
    return (
        <>
            <PageHeader title="Member Panel page" />
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[{ title: <a href="/member-panel">Member Panel</a> }]}
            />
        </>
    );
}

export default MemberPanel;
