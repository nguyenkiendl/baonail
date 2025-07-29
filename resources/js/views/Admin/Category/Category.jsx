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
    const { wareHouse } = useParams();
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
        categories.getDatas(wareHouse).then((res) => {
            setDataSource(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchDatas();
    }, [load]);

    const handleCategoryDetail = (cateId) => {
        navigate(`/${wareHouse}/category/${cateId}`);
    };

    const handleClickAdd = (e) => {
        setFormData({ name: "", unit: "", price: 0 });
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

    const getTotalPrice = (id) => {
        var totalPrice = 0;
        const record = dataSource.find((d) => d.id == id);
        if (record && record.datas?.length > 0) {
            totalPrice = record.datas?.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        }
        return totalPrice;
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
                title="Thực đơn"
                extra={
                    <Button
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={handleClickAdd}
                    >
                        Thêm thực đơn
                    </Button>
                }
            />
            <CategoryModal
                isOpen={isOpen}
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
                        title="GIÁ NHẬP"
                        dataIndex="cost"
                        key="cost"
                        width={120}
                        render={(text, record) => (
                            <Text type="danger">
                                {formatPrice(getTotalPrice(record.id))}
                            </Text>
                        )}
                    />
                    <Table.Column
                        title="GIÁ BÁN"
                        dataIndex="price"
                        key="price"
                        width={120}
                        render={(price) => (
                            <Text type="danger">{formatPrice(price)}</Text>
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
                                            onClick={() =>
                                                handleCategoryDetail(record.id)
                                            }
                                        >
                                            Chi tiết
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
