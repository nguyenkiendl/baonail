import {
    Badge,
    Button,
    Card,
    Input,
    PageHeader,
    Popconfirm,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categories from "~/store/categories";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CategoryModal from "./CategoryModal";
import notify from "~/utils/notify";
import { formatPrice, removeVietnameseTones } from "~/utils/filters";
import TopHeader from "~/components/TopHeader/TopHeader";
const { Text, Link } = Typography;

function Category() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const [filters, setFilters] = useState({ name: "" });
    const [activeTab, setActiveTab] = useState([]);

    const fetchDatas = () => {
        setLoading(true);
        categories.getDatas().then((res) => {
            setDataSource(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchDatas();
    }, [load]);

    const handleClickAdd = (e) => {
        setFormData({ name: "", parent_id: null });
        setIsOpen(true);
    };

    const handleEdit = (item) => {
        setFormData({ ...item });
        setIsOpen(true);
    };

    const finishSubmitForm = (type, data) => {
        if (type == "add") {
            setLoad(!load);
        } else if (type == "update") {
            setDataSource((prevDatas) => {
                const newDatas = prevDatas.map((obj) => {
                    if (obj.id === data.id) {
                        return data;
                    }
                    return obj;
                });
                return newDatas;
            });
        }
        setIsOpen(false);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDelete = (row) => {
        if (row.id) {
            categories
                .deleteData(row.id)
                .then((response) => {
                    if (response.success) {
                        setLoad(!load);
                        notify.success("Đã xóa!", response.message);
                    } else {
                        notify.error("Thất bại", response.message);
                    }
                })
                .catch((error) => {
                    notify.error("Lỗi", error);
                });
        }
    };

    const handleChangeName = (valueName) => {
        setFilters({ ...filters, name: valueName });
    };

    const filteredData = dataSource.filter((item) => {
        const nameFilter =
            filters.name != ""
                ? removeVietnameseTones(item.name)
                      .toLowerCase()
                      .includes(
                          removeVietnameseTones(filters.name).toLowerCase()
                      )
                : true;
        const familyFilter =
            activeTab != 0 ? activeTab == item.family_id : true;
        return nameFilter && familyFilter;
    });
    return (
        <>
            <TopHeader
                title="Danh mục"
                extra={
                    <Button
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={handleClickAdd}
                    >
                        Thêm danh mục
                    </Button>
                }
            />
            <CategoryModal
                isOpen={isOpen}
                dataSource={dataSource}
                initialValues={formData}
                onSubmit={finishSubmitForm}
                onCancel={closeModal}
            />
            <Card size="small" style={{ marginBottom: 0 }}>
                <Table
                    rowKey={(record) => record.id}
                    dataSource={filteredData}
                    pagination={false}
                    loading={loading}
                    scroll={{
                        x: 1024,
                        y: "70vh",
                    }}
                >
                    <Table.Column
                        title="STT"
                        dataIndex="index"
                        key="index"
                        align="center"
                        width={50}
                        render={(text, record, index) => (
                            <span>{index + 1}</span>
                        )}
                    />
                    <Table.Column
                        title={() => (
                            <Input
                                allowClear
                                placeholder="TÊN MÓN ĂN"
                                value={filters.name}
                                onChange={(e) =>
                                    handleChangeName(e.target.value)
                                }
                            />
                        )}
                        dataIndex="name"
                        key="name"
                        width={120}
                        render={(text, record) => (
                            <a onClick={() => handleEdit(record)}>
                                <EditOutlined /> {record.name}
                            </a>
                        )}
                    />
                    <Table.Column
                        title="DANH MỤC CHA"
                        dataIndex="parent_name"
                        key="parentName"
                        width={120}
                        render={(parentName, record) => (
                            <span>{parentName}</span>
                        )}
                    />
                    <Table.Column
                        title="HÀNH ĐỘNG"
                        dataIndex="action"
                        key="action"
                        align="center"
                        width={120}
                        render={(text, record) => {
                            return (
                                <>
                                    <Space size="middle">
                                        <Button
                                            size="small"
                                            type="primary"
                                            onClick={() => handleEdit(record)}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                        <Popconfirm
                                            placement="left"
                                            title="Bạn có muốn xóa danh mục này?"
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
                                                icon={<DeleteOutlined />}
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
            </Card>
        </>
    );
}

export default Category;
