import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";
import notify from "~/utils/notify";
import categories from "~/store/categories";
import { useParams } from "react-router-dom";
import { formatter, parser } from "~/utils/filters";
const { TextArea } = Input;
function CategoryModal({
    isOpen,
    dataSource,
    initialValues,
    onSubmit,
    onCancel,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [parents, setParents] = useState([]);

    const onFinish = (values) => {
        setLoading(true);
        if (initialValues.id) {
            categories
                .updateData(initialValues.id, values)
                .then((response) => {
                    if (response.success) {
                        onSubmit("update", response.data);
                        notify.success("Thành công", response.message);
                    } else {
                        notify.error("Thất bại", response.message);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    notify.error("Thất bại", error);
                });
        } else {
            categories
                .addData(values)
                .then((response) => {
                    if (response.success) {
                        onSubmit("add", response.data);
                        notify.success("Thành công", response.message);
                    } else {
                        notify.error("Thất bại", response.message);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    notify.error("Thất bại", error);
                });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    var text = initialValues.id ? "Sửa danh mục" : "Thêm danh mục";
    useEffect(() => {
        if (isOpen) {
            console.log(initialValues);
            form.setFieldsValue(initialValues);
            if (dataSource) {
                const newParents = dataSource.map((d) => {
                    return {
                        value: d.id,
                        label: d.name,
                    };
                });
                setParents(newParents);
            }
        }
    }, [isOpen, dataSource, initialValues, form]);

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
                            label="Tên danh mục"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập tên danh mục!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên danh mục" />
                        </Form.Item>
                        <Form.Item label="Danh mục cha" name="parent_id">
                            <Select
                                placeholder="Danh mục cha"
                                style={{ width: 270 }}
                                options={parents}
                                allowClear
                            />
                        </Form.Item>
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

export default CategoryModal;
