import { Button, Col, Collapse, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import "moment/locale/vi";
import SelectHide from "~/components/Form/SelectHide";
const { Panel } = Collapse;
function ProductFilter({ families, onChange }) {
    const [form] = Form.useForm();
    const [activeKey, setActiveKey] = useState([]);
    const onFinish = (values) => {
        const newValue = { ...values }
        onChange(newValue)
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        const errorFields = errorInfo.errorFields;
        if (errorFields.length > 0) {
            form.scrollToField(errorFields[0].name, {
                behavior: "smooth",
                block: "center",
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            name: '',
            family: '',
        });
    }, [form]);

    return (
        <>
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col span={24}>
                        <Collapse
                            activeKey={activeKey}
                            onChange={setActiveKey}
                            expandIconPosition="start"
                        >
                            <Panel
                                header="Bộ lọc"
                                key="filter"
                            >
                                <div className="d-inline">
                                    <Form.Item
                                        name="name"
                                        style={{
                                            marginBottom: 0
                                        }}
                                    >
                                        <Input placeholder="Tên sản phẩm" />
                                    </Form.Item>
                                    <Form.Item
                                        name="family"
                                        style={{
                                            marginBottom: 0
                                        }}
                                    >
                                        <SelectHide
                                            allowClear
                                            placeholder="Nhóm sản phẩm"
                                            options={
                                                families?.map(f => {
                                                    return {
                                                        value: f.id,
                                                        label: f.name
                                                    }
                                                })
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        style={{
                                            marginBottom: 0
                                        }}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                        >Lọc</Button>
                                    </Form.Item>
                                </div>
                            </Panel>
                        </Collapse >
                    </Col>
                </Row>
            </Form >
        </>
    );
}

export default ProductFilter;