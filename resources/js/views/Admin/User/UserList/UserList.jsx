import { EditOutlined } from "@ant-design/icons";
import { Space, Table, Button, Popconfirm, Tag } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "~/context/AppContext";
import users from "~/store/users";
import { formatDateTime } from "~/utils/filters";
import notify from "~/utils/notify";
import { UserContext } from "../User";
function UserList({ onEdit }) {
    const { userRole } = useContext(AppContext);
    const { dataSource, setDataSource, load, setLoad } =
        useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "25", "50", "100", "200", "500"],
        total: 0,
    });

    const fetchUsers = (current, pageSize) => {
        setLoading(true);
        users
            .getDatas({
                page: current,
                page_size: pageSize,
            })
            .then((res) => {
                setDataSource(res.data);
                setLoading(false);
                setPagination({
                    ...pagination,
                    current: Number(res.meta.current_page),
                    pageSize: Number(res.meta.page_size),
                    total: res.meta.total,
                });
            });
    };

    useEffect(() => {
        fetchUsers(pagination.current, pagination.pageSize);
    }, [load]);

    const handleTableChange = (pagination, filters, sorter) => {
        fetchUsers(pagination.current, pagination.pageSize);
    };

    const handleDelete = (userId) => {
        users
            .deleteData(userId)
            .then((response) => {
                if (response.success) {
                    setLoad(!load);
                    notify.success("Đã xóa!", "Xóa thành công!");
                } else {
                    notify.success("Lỗi!", response.message);
                }
            })
            .catch((error) => {
                notify.error("Lỗi", error);
            });
    };
    return (
        <>
            <Table
                rowKey={(record) => record.id}
                dataSource={dataSource}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                bordered
                scroll={{
                    x: 1024,
                    y: "75vh",
                }}
            >
                <Table.Column
                    title="ID"
                    dataIndex="id"
                    key="id"
                    render={(id) => <span>{id}</span>}
                    align="center"
                    width={50}
                />

                <Table.Column
                    title="Tên đăng nhập"
                    dataIndex="username"
                    key="username"
                    render={(username) => <span>{username}</span>}
                    width={100}
                />
                <Table.Column
                    title="Họ Và Tên"
                    dataIndex="name"
                    key="name"
                    render={(name) => <span>{name}</span>}
                    width={150}
                />
                <Table.Column
                    title="Loại"
                    dataIndex="role_name"
                    key="rolename"
                    render={(role_name) => <Tag color="#f50">{role_name}</Tag>}
                    align="center"
                    width={70}
                />
                <Table.Column
                    title="Ngày Tạo"
                    dataIndex="created_at"
                    key="createdAt"
                    render={(created_at) => (
                        <span>{formatDateTime(created_at)}</span>
                    )}
                    align="center"
                    width={150}
                />
                <Table.Column
                    title="Trạng Thái"
                    dataIndex="status"
                    key="status"
                    render={(status) => <span>{status}</span>}
                    align="center"
                    width={100}
                />
                <Table.Column
                    title="Hành Động"
                    dataIndex="action"
                    key="action"
                    align="center"
                    width={150}
                    render={(text, record) => {
                        return (
                            <>
                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        size="small"
                                        disabled={userRole != "admin"}
                                        icon={<EditOutlined />}
                                        onClick={() => onEdit(record)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <Popconfirm
                                        placement="left"
                                        title="Bạn có muốn xóa tài khoản này?"
                                        disabled={userRole != "admin"}
                                        onConfirm={() =>
                                            handleDelete(record.id)
                                        }
                                        okText="Đồng ý xóa"
                                        cancelText="hủy"
                                        okType="danger"
                                    >
                                        <Button
                                            type="dashed"
                                            size="small"
                                            danger
                                        >
                                            Xóa
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            </>
                        );
                    }}
                />
            </Table>
        </>
    );
}

export default UserList;
