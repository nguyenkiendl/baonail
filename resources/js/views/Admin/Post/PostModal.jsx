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
    Row,
    Col,
} from "antd";
import notify from "~/utils/notify";
import posts from "~/store/posts";
import { useParams } from "react-router-dom";
import Image from "~/components/Image";
import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
const { TextArea } = Input;
const { Title } = Typography;
function PostModal({ isOpen, initialValues, categories, onSubmit, onCancel }) {
    const { wareHouse } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [conversions, setConversions] = useState([]);
    const onFinish = (values) => {
        setLoading(true);
        if (initialValues.id) {
            const formData = new FormData();
            formData.append("_method", "PATCH");
            formData.append("title", values.title);
            if (values.content) {
                formData.append("content", values.content || "");
            }
            if (values.category) {
                formData.append("category", values.category || null);
            }

            if (
                values.file &&
                values.file[0] &&
                values.file[0]?.originFileObj
            ) {
                formData.append("file", values.file[0]?.originFileObj);
            }

            posts
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
            formData.append("title", values.title);
            if (values.content) {
                formData.append("content", values.content || "");
            }
            if (values.category) {
                formData.append("category", values.category || null);
            }
            if (
                values.file &&
                values.file[0] &&
                values.file[0]?.originFileObj
            ) {
                formData.append("file", values.file[0]?.originFileObj);
            }
            posts
                .addData(formData)
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

    var text = initialValues.id ? "Sửa bài viết" : "Thêm bài viết";
    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue({
                title: initialValues.title,
                content: initialValues.content,
                category: null,
                category_name: "",
            });
            if (initialValues.category_id) {
                console.log(initialValues.category_id);

                form.setFieldsValue({
                    category: initialValues.category_id,
                });
            }
            if (initialValues.file) {
                form.setFieldsValue({
                    file: [
                        {
                            uid: "-1",
                            name: initialValues.title,
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

    return (
        <>
            <Modal
                title={text}
                open={isOpen}
                onCancel={onCancel}
                footer={null} // Disable footer
                header={null} // Disable header
                width={1024}
                style={{
                    maxHeight: "calc(100vh -150px)",
                    overflow: "auto",
                }}
                maskClosable={false}
            >
                <Form
                    form={form}
                    layout="vertical"
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
                        <Row gutter={[16, 16]}>
                            <Col span={16}>
                                <Form.Item
                                    label="Tiêu đề"
                                    name="title"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nhập tiêu đề!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập tiêu đề" />
                                </Form.Item>
                                <Form.Item
                                    label="Nội dung"
                                    name="content"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >
                                    <TextArea
                                        rows={20}
                                        placeholder="Nhập nội dung"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Danh mục"
                                            name="category"
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Select
                                                placeholder="Chọn danh mục"
                                                allowClear
                                                options={
                                                    categories?.map((f) => {
                                                        return {
                                                            value: f.id,
                                                            label: f.name,
                                                        };
                                                    }) || []
                                                }
                                            />
                                        </Form.Item>
                                        <Image />
                                        <Form.Item
                                            label=""
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Space>
                                                <Button
                                                    type="default"
                                                    onClick={onCancel}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    loading={loading}
                                                >
                                                    Lưu
                                                </Button>
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default PostModal;
