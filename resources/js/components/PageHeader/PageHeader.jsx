import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PageHeader = ({ title, subTitle, onClick }) => {
    return (
        <div style={{ marginBottom: 24 }}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={3}>{title}</Title>
                    <Text type="secondary">{subTitle}</Text>
                </Col>
                <Col>
                    <Button type="primary" onClick={onClick}>
                        <PlusOutlined /> Thêm mới
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default PageHeader;
