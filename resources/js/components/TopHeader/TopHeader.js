import { ArrowLeftOutlined } from "@ant-design/icons";

function TopHeader({ title, extra = null }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 15 }}>
            <a style={{ width: 30, height: 33, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => window.history.back()}><ArrowLeftOutlined /></a>
            <h2 style={{ marginBottom: 0 }}>{title}</h2>
            {extra ? extra : ''}
        </div>
    );
}

export default TopHeader;