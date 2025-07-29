import { Breadcrumb, Typography } from "antd";
import PageHeader from "~/components/PageHeader";
const { Title } = Typography;
function ModeratorPanel() {
    return (
        <>
            <PageHeader title="Moderator Panel page" />
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[
                    { title: <a href="/moderator-panel">Moderator Panel</a> },
                ]}
            />
        </>
    );
}

export default ModeratorPanel;
