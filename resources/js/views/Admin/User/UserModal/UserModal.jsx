import { LockOutlined, BlockOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { AppContext } from "~/context/AppContext";
import users from "~/store/users";
import notify from "~/utils/notify";
import { generatePass } from "~/utils/filters";
import { AGENCY_OPTIONS } from "~/utils/constants";

function UserModal({ isOpen, initialValues, onSubmit, onCancel }) {
    const [form] = Form.useForm();
    const { roles, views } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(true);

    const onFinish = (values) => {
        setLoading(true);
        if (initialValues.id) {
            users
                .updateData(initialValues.id, values)
                .then((response) => {
                    if (response.success) {
                        setLoading(false);
                        onSubmit("update", response.data);
                        notify.success("Thành công", "Cập nhật thành công");
                    } else {
                        notify.error("Lỗi", response.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.response && error.response.data) {
                        const errors = error.response.data.errors;
                        if (errors.email) {
                            notify.error("Lỗi", errors.email[0]);
                        }
                        if (errors.username) {
                            notify.error("Lỗi", errors.username[0]);
                        }
                    } else {
                        notify.error("Thất bại, Lỗi hệ thống!");
                    }
                });
        } else {
            users
                .addData(values)
                .then((response) => {
                    if (response.success) {
                        setLoading(false);
                        onSubmit("add", response.data);
                    } else {
                        notify.error("Lỗi", response.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.response && error.response.data) {
                        const errors = error.response.data.errors;
                        if (errors.email) {
                            notify.error("Lỗi", errors.email[0]);
                        }
                        if (errors.username) {
                            notify.error("Lỗi", errors.username[0]);
                        }
                    } else {
                        notify.error("Thất bại, Lỗi hệ thống!");
                    }
                });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const compareToFirstPassword = (rule, value) => {
        //console.log(rule, value);
        if (value && value !== form.getFieldValue("password")) {
            return Promise.reject(
                "Mật khẩu xác nhận không khớp với mật khẩu mới"
            );
        } else {
            return Promise.resolve();
        }
    };

    const handleEditPassword = () => {
        setIsEditPassword(true);
    };

    const handleGenerateRandomPass = () => {
        let newPass = generatePass();
        form.setFieldsValue({
            password: newPass,
            password_confirmation: newPass,
        });
    };
    var text = initialValues.id ? "Sửa tài khoản" : "Thêm tài khoản";
    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue(initialValues);
            form.setFieldsValue({
                password: "",
                password_confirmation: "",
            });
            if (initialValues.id) {
                setIsEditPassword(false);
            } else {
                setIsEditPassword(true);
            }
        }
    }, [isOpen, initialValues, form]);

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
                            label="Họ và tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập họ và tên!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập họ và tên" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập địa chỉ email!",
                                },
                                {
                                    type: "email",
                                    message: "Không đúng định dạng!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập tên đăng nhập!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            label="Loại"
                            name="role_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Chọn loại tài khoản",
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 170,
                                }}
                                options={roles.map((r) => {
                                    return {
                                        value: r.id,
                                        label: r.display_name,
                                    };
                                })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: "Trạng thái",
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 170,
                                }}
                                options={[
                                    {
                                        value: "Active",
                                        label: "Active",
                                    },
                                    {
                                        value: "Deactive",
                                        label: "Deactive",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <div>
                            {isEditPassword ? (
                                <>
                                    <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Nhập mật khẩu!",
                                            },
                                            {
                                                min: 8,
                                                message:
                                                    "Mật khẩu mới chứa ít nhất 8 ký tự",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Xác nhận mật khẩu"
                                        name="password_confirmation"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Xác nhận mật khẩu!",
                                            },
                                            {
                                                min: 8,
                                                message:
                                                    "Mật khẩu mới chứa ít nhất 8 ký tự",
                                            },
                                            {
                                                validator:
                                                    compareToFirstPassword,
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập lại mật khẩu" />
                                    </Form.Item>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="ant-modal-footer">
                        {!isEditPassword ? (
                            <Button
                                type="danger"
                                icon={<LockOutlined />}
                                onClick={handleEditPassword}
                            >
                                Đổi mật khẩu
                            </Button>
                        ) : (
                            <Button onClick={handleGenerateRandomPass}>
                                <BlockOutlined /> Tạo mật khẩu
                            </Button>
                        )}

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

export default UserModal;
