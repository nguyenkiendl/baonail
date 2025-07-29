import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Table,
    Typography,
    InputNumber,
    Space,
    Popconfirm,
    Select,
} from "antd";
import notify from "~/utils/notify";
import products from "~/store/products";
import { useParams } from "react-router-dom";
import Image from "~/components/Image";
import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
const { TextArea } = Input;
const { Title } = Typography;
function PostModal({ isOpen, initialValues, families, onSubmit, onCancel }) {
    const { wareHouse } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [conversions, setConversions] = useState([]);
    const onFinish = (values) => {
        setLoading(true);
        if (initialValues.id) {
            const formData = new FormData();
            formData.append("_method", "PATCH");
            formData.append("code", values.code);
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("unit", values.unit);
            formData.append("family", values.family || 0);
            if (
                values.file &&
                values.file[0] &&
                values.file[0]?.originFileObj
            ) {
                formData.append("file", values.file[0]?.originFileObj);
            }

            if (values.conversions && values.conversions.length) {
                values.conversions.forEach((obj, index) => {
                    formData.append(`conversions[${index}][id]`, obj.id || 0);
                    formData.append(`conversions[${index}][unit]`, obj.unit);
                    formData.append(`conversions[${index}][ratio]`, obj.ratio);
                    formData.append(
                        `conversions[${index}][operation]`,
                        obj.operation
                    );
                });
            }
            products
                .updateData(initialValues.id, formData)
                .then((response) => {
                    if (response.success) {
                        onSubmit("update", response.data);
                        notify.success("Thành công", response.message);
                    } else {
                        notify.error("Thất bại", response.message);
                    }
                })
                .catch((error) => {
                    notify.error("Thất bại", error.response.data.message);
                })
                .finally(() => {
                    setLoading(false); // Đảm bảo setLoading là false khi kết thúc
                });
        } else {
            const formData = new FormData();
            formData.append("code", values.code);
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("unit", values.unit);
            formData.append("family", values.family || 0);
            if (
                values.file &&
                values.file[0] &&
                values.file[0]?.originFileObj
            ) {
                formData.append("file", values.file[0]?.originFileObj);
            }
            if (values.conversions && values.conversions.length) {
                values.conversions.forEach((obj, index) => {
                    formData.append(`conversions[${index}][id]`, obj.id || 0);
                    formData.append(`conversions[${index}][unit]`, obj.unit);
                    formData.append(`conversions[${index}][ratio]`, obj.ratio);
                    formData.append(
                        `conversions[${index}][operation]`,
                        obj.operation
                    );
                });
            }
            products
                .addData(wareHouse, formData)
                .then((response) => {
                    if (response.success) {
                        onSubmit("add", response.data);
                        notify.success("Thành công", response.message);
                    } else {
                        notify.error("Thất bại", response.message);
                    }
                })
                .catch((error) => {
                    notify.error("Thất bại", error);
                })
                .finally(() => {
                    setLoading(false); // Đảm bảo setLoading là false khi kết thúc
                });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    var text = initialValues.id ? "Sửa sản phẩm" : "Thêm sản phẩm";
    useEffect(() => {
        if (isOpen) {
            setConversions(initialValues.conversions);
            form.setFieldsValue({
                code: initialValues.code,
                name: initialValues.name,
                description: initialValues.description,
                unit: initialValues.unit,
                conversions: initialValues.conversions,
                family: "",
            });
            if (initialValues.family_id) {
                form.setFieldsValue({
                    family: initialValues.family_id,
                });
            }
            if (initialValues.file) {
                form.setFieldsValue({
                    file: [
                        {
                            uid: "-1",
                            name: initialValues.name,
                            status: "done",
                            url: `/uploads/thumbnails/${initialValues.file}`,
                        },
                    ],
                });
            } else {
                form.setFieldsValue({
                    file: [],
                });
            }
        }
    }, [isOpen, initialValues, form]);

    const handleClickAddRow = () => {
        const row = {
            index: conversions.length + 1,
            id: "",
            unit: "",
            ratio: "",
            operation: "",
        };
        const newConversions = [...conversions, row];
        setConversions(newConversions);
    };

    const handleDelete = (row) => {
        const newData = conversions.filter((item) => item.id !== row.id);
        setConversions(newData);
    };

    return (
        <>
            <Modal
                title={text}
                open={isOpen}
                onCancel={onCancel}
                footer={null}
                maskClosable={false}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="form-wrap">
                        <Form.Item
                            label="Mã NVL"
                            name="code"
                            rules={[
                                {
                                    required: false,
                                    message: "Nhập mã nguyên vật liệu!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã nguyên vật liệu" />
                        </Form.Item>
                        <Form.Item
                            label="Tên nguyên vật liệu"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập tên nguyên vật liệu!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên nguyên vật liệu" />
                        </Form.Item>
                        <Image />
                        <Form.Item
                            label="Đơn vị"
                            name="unit"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập đơn vị!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập đơn vị" />
                        </Form.Item>
                        <Form.Item label="Mô tả" name="description">
                            <TextArea rows={4} placeholder="Nhập mô tả" />
                        </Form.Item>
                        <Form.Item label="Nhóm" name="family">
                            <Select
                                placeholder="Chọn nhóm vật liệu"
                                allowClear
                                options={
                                    families?.map((f) => {
                                        return {
                                            value: f.id,
                                            label: f.name,
                                        };
                                    }) || []
                                }
                            />
                        </Form.Item>
                        <Title level={4}>Đơn vị chuyển đổi</Title>
                        {conversions.length > 0 ? (
                            <Table
                                rowKey={(record) => record.id}
                                dataSource={conversions}
                                pagination={false}
                                bordered
                            >
                                <Table.Column
                                    title="STT"
                                    dataIndex="index"
                                    key="index"
                                    width={40}
                                    align="center"
                                    render={(text, record, index) => (
                                        <>
                                            <span>{index + 1}</span>
                                        </>
                                    )}
                                />
                                <Table.Column
                                    title="ĐƠN VỊ"
                                    dataIndex="unit"
                                    key="unit"
                                    align="center"
                                    width={120}
                                    render={(value, row, index) => (
                                        <Form.Item
                                            name={[
                                                "conversions",
                                                index,
                                                "unit",
                                            ]}
                                            style={{ margin: "0 0 0" }}
                                            labelCol={{ span: 0 }}
                                            wrapperCol={{ span: 24 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nhập đơn vị!",
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: "100%" }} />
                                        </Form.Item>
                                    )}
                                />
                                <Table.Column
                                    dataIndex="ratio"
                                    title="TỈ LỆ"
                                    width={100}
                                    render={(value, row, index) => {
                                        return (
                                            <Form.Item
                                                name={[
                                                    "conversions",
                                                    index,
                                                    "ratio",
                                                ]}
                                                style={{ margin: "0 0 0" }}
                                                labelCol={{ span: 0 }}
                                                wrapperCol={{ span: 24 }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Nhập tỉ lệ!",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    min="0"
                                                    style={{ width: "100%" }}
                                                />
                                            </Form.Item>
                                        );
                                    }}
                                />
                                <Table.Column
                                    dataIndex={"operation"}
                                    title="PHÉP TÍNH"
                                    width={90}
                                    render={(value, row, index) => {
                                        return (
                                            <Form.Item
                                                name={[
                                                    "conversions",
                                                    index,
                                                    "operation",
                                                ]}
                                                style={{ margin: "0 0 0" }}
                                                labelCol={{ span: 0 }}
                                                wrapperCol={{ span: 24 }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Chọn phép tính!",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    placeholder="Chọn phép tính"
                                                    style={{
                                                        width: 90,
                                                    }}
                                                    options={[
                                                        {
                                                            value: "*",
                                                            label: "*",
                                                        },
                                                        {
                                                            value: "/",
                                                            label: "/",
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                        );
                                    }}
                                />
                                <Table.Column
                                    title=""
                                    dataIndex="action"
                                    key="action"
                                    align="center"
                                    width={50}
                                    render={(text, record) => {
                                        return (
                                            <>
                                                <Space size="middle">
                                                    <Popconfirm
                                                        placement="left"
                                                        title="Bạn có muốn xóa dòng này?"
                                                        onConfirm={() =>
                                                            handleDelete(record)
                                                        }
                                                        okText="Đồng ý xóa"
                                                        cancelText="hủy"
                                                        okType="danger"
                                                    >
                                                        <Button
                                                            type="dashed"
                                                            size="small"
                                                            icon={
                                                                <DeleteOutlined />
                                                            }
                                                            danger
                                                        />
                                                    </Popconfirm>
                                                </Space>
                                            </>
                                        );
                                    }}
                                />
                            </Table>
                        ) : (
                            ""
                        )}

                        <Button
                            type="primary"
                            size="small"
                            icon={<PlusCircleFilled />}
                            onClick={handleClickAddRow}
                        >
                            Thêm dòng
                        </Button>
                    </div>

                    <div className="ant-modal-footer">
                        <Button type="default" onClick={onCancel}>
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default PostModal;
