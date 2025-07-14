import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button } from "antd";
import authService from "~/services/authService";
import notify from "~/utils/notify.js";

const Login = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [role, setRole] = useState('');
    const [view, setView] = useState('');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    let isLoggedIn = authService.isAuthenticated();

    useEffect(() => {
        if (isLoggedIn) {
            if (role == 'superadmin') {
                return navigate("/order");
            } else if (['maketing'].includes(role)) {
                return navigate(`/statistical`);
            } else if (['housekeeping', 'housechecking'].includes(role)) {
                return navigate(`/${view}/room`);
            } else if (view) {
                return navigate(`/order-private/${view}`);
            } else if (isSubmit && view == '') {
                return notify.error("Tài khoản chưa cấp quyền", "Vui lòng liên hệ quản lý để được hỗ trợ!");
            }
        }
    }, [isLoggedIn, isSubmit, role, view])

    const onFinish = async (values) => {
        console.log("Received values:", values);
        const { username, password } = values;
        setLoading(true);
        authService
            .login(username, password)
            .then((response) => {
                if (response.access_token) {
                    setLoading(false);
                    setRole(response.role);
                    setView(response.view);
                    setIsSubmit(true);
                    console.log("Login Successfuly!!!");
                }
            })
            .catch((error) => {
                console.error("Login failed:", error);
                let failedMessage =
                    "Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.";
                form.setFieldsValue({ password: "" });
                setError(failedMessage);
                notify.error("Đăng nhập thất bại", failedMessage);
                setLoading(false);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                title="Đăng nhập"
                style={{
                    width: 400,
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {error && (
                        <div style={{ color: "red", marginBottom: "1rem" }}>
                            {error}
                        </div>
                    )}
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[
                            { required: true, message: "Nhập tên đăng nhập!" },
                        ]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "nhập mật khẩu!" }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            autoComplete="password"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
