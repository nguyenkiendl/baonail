import { ArrowDownOutlined, ArrowUpOutlined, BlockOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, PageHeader, Row, Space, Statistic, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "~/context/AppContext";
import authService from "~/services/authService";
import users from "~/store/users";
import { generatePass } from "~/utils/filters";
import notify from "~/utils/notify";

function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);

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

    const onFinish = (values) => {
        setLoading(true);
        console.log(values);
        users
            .updateProfile(user.id, values)
            .then((res) => {
                if (res.success) {
                    setLoading(false);
                    if (res.data) {
                        form.setFieldsValue(res.data);
                        notify.success(
                            "Thành công",
                            "Cập nhật thông tin thành công"
                        );
                    } else {
                        notify.error("Lỗi", res.message);
                    }
                } else {
                    notify.error("Lỗi", res.message);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                notify.error("Lỗi", error);
            });

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

    console.log(isEditPassword);

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    useEffect(() => {
        const isLoggedIn = authService.isAuthenticated();
        if (isLoggedIn) {
            //notify.open("LOGINSUCCESS", "Login Success!", "Đăng Nhập Thành Công!");
        }
    }, [navigate]);

    return (
        <div>
            <Card
                title="Thông tin tài khoản"
                bordered={false}
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
                        <Row>
                            <Col span={10}>
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
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nhập địa chỉ email!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Tên đăng nhập"
                                    name="username"
                                >
                                    <Tag color="#f50">{user?.username}</Tag>
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
                            </Col>
                            <Col span={14}>
                                <Row>
                                    <Col span={20} offset={2}>
                                        <Form.Item
                                            label="Đơn vị thực hiện"
                                            name={['info', 'agency']}
                                        >
                                            <Input readOnly={true} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Chức vụ"
                                            name={['info', 'position']}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Bộ phận"
                                            name={['info', 'team']}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Space>
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
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                        >
                                            Cập nhật
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default Profile;
