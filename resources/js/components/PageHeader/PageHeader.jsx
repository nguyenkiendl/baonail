import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PageHeader = ({ title, onClick }) => {
    return (
        <div style={{ marginBottom: 15 }}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={3} style={{ marginBottom: 0 }}>
                        {title}
                    </Title>
                </Col>
                {onClick ? (
                    <Col>
                        <Button type="primary" onClick={onClick}>
                            <PlusOutlined /> Thêm mới
                        </Button>
                    </Col>
                ) : (
                    ""
                )}
            </Row>
        </div>
    );
};

export default PageHeader;
