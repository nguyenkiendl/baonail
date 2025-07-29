import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, PageHeader, Popconfirm, Space, Table, Tag, Typography } from "antd";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DetailModal from "./DetailModal";
import categories from "~/store/categories";
import notify from "~/utils/notify";
import EditableRow from "~/components/Table/EditableRow";
import EditableCell from "~/components/Table/EditableCell";
import { formatPrice } from "~/utils/filters";
import Navcrumb from "~/views/Stock/Navcrumb";
import Thumbnail from "~/components/Image/Thumbnail";
export const CategoryContext = createContext({});
const { Text, Link } = Typography;
function CategoryDetails() {
    const { wareHouse, cateId } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [load, setLoad] = useState(false);

    const [productList, setProductList] = useState([]);
    const fetchData = () => {
        setLoading(true);
        categories
            .getDetails(wareHouse, cateId)
            .then((response) => {
                if (response.data) {
                    setData(response.data);
                }
                if (response.data.datas) {
                    setDataSource(response.data.datas);
                }
                if (response.products) {
                    setProductList(response.products);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [load]);

    const pageTitle = `${data.name ?? ''}`;

    const handleClickAdd = (e) => {
        setFormData({ ids: [] });
        setIsOpen(true);
    }

    const handleEdit = (item) => {
        setFormData({ ...item });
        setIsOpen(true);
    }

    const handleSave = (row, isChange) => {
        if (isChange) {
            const value = {
                id: row.id,
                quantity: row.quantity,
            };
            if (row.id) {
                setDataSource((prevDatas) => {
                    const newDatas = prevDatas.map(obj => {
                        if (obj.id === row.id) {
                            return { ...row }
                        }
                        return obj;
                    })
                    return newDatas;
                });
                categories
                    .updatePivotProduct(cateId, value)
                    .then((response) => {
                        if (response.success) {
                        } else {
                            notify.error("Thất bại", response.message);
                        }
                    })
                    .catch((error) => {
                        notify.error("Thất bại", error);
                    });
            }
        }
    };

    const handleDelete = (row) => {
        if (row.id) {
            categories
                .deletePivotProduct(cateId, row.id)
                .then((response) => {
                    if (response.success) {
                        setDataSource(response.data.datas);
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

    return (
        <>
            <Navcrumb />
            <CategoryContext.Provider value={{
                cateId: cateId,
                dataSource: dataSource,
                setDataSource: setDataSource,
                isOpen: isOpen,
                setIsOpen: setIsOpen,
                productList: productList,
            }}>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={pageTitle}
                    extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleClickAdd}>Thêm mới</Button>}
                />
                <Card
                    size="small"
                >
                    <DetailModal />
                    <Table
                        rowKey={(record) => record.id}
                        components={{
                            body: {
                                row: EditableRow,
                                cell: EditableCell,
                            },
                        }}
                        rowClassName={() => 'editable-row'}
                        dataSource={dataSource}
                        loading={loading}
                        pagination={false}
                        scroll={{
                            x: 1024
                        }}
                        bordered
                        summary={(pageData) => {
                            let totalPrice = 0;
                            pageData.forEach(({ quantity, price }) => {
                                totalPrice += (quantity * price);
                            });
                            return (
                                <>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={4} index={1}>Tổng cộng</Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1} index={2} align="center">
                                            <Text type="danger" strong>{formatPrice(totalPrice)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={4} index={3}></Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </>
                            );
                        }}
                    >
                        <Table.Column
                            title="STT"
                            dataIndex="index"
                            key="index"
                            width={50}
                            align="center"
                            render={(text, record, index) => <span>{index + 1}</span>}
                        />
                        <Table.Column
                            title="HÌNH ẢNH"
                            dataIndex="thumbnail"
                            key="thumbnail"
                            width={100}
                            align="center"
                            render={(text, record, index) => {
                                return (
                                    <Thumbnail file={record.file} />
                                );
                            }}
                        />
                        <Table.Column
                            title="SẢN PHẨM"
                            dataIndex="name"
                            key="name"
                            width={200}
                            render={(name) => {
                                return (
                                    <>
                                        <a>{name}</a>
                                    </>
                                );
                            }}
                        />
                        <Table.Column
                            title="ĐỊNH LƯỢNG"
                            dataIndex="quantity"
                            key="quantity"
                            width={100}
                            align="center"
                            onCell={(record, index) => ({
                                record,
                                required: true,
                                inputType: 'number',
                                dataIndex: 'quantity',
                                title: 'Định lượng',
                                editable: true,
                                handleSave,
                            })}
                            render={(text, record) => (
                                <Text type="danger">{record.quantity}</Text>
                            )}
                        />
                        <Table.Column
                            title="ĐƠN VỊ"
                            dataIndex="unit"
                            key="unit"
                            width={100}
                            align="center"
                            render={(unit) => (
                                <span>{unit}</span>
                            )}
                        />
                        <Table.Column
                            title="GIÁ"
                            dataIndex="price"
                            key="price"
                            width={100}
                            align="center"
                            render={(price) => (
                                <Text type="danger">{formatPrice(price)}</Text>
                            )}
                        />
                        <Table.Column
                            title="HÀNH ĐỘNG"
                            dataIndex="action"
                            key="action"
                            width={170}
                            render={(text, record) => {
                                return (
                                    <>
                                        <Space>
                                            <Popconfirm
                                                placement="left"
                                                title="Bạn có muốn xóa sản phẩm này?"
                                                onConfirm={() =>
                                                    handleDelete(record)
                                                }
                                                okText="Đồng ý xóa"
                                                cancelText="hủy"
                                                okType="danger"
                                            >
                                                <Button type="dashed" size="small" icon={<DeleteOutlined />} danger>Xóa</Button>
                                            </Popconfirm>
                                        </Space>
                                    </>
                                )
                            }}
                        />
                    </Table>
                </Card>
            </CategoryContext.Provider>
        </>
    );
}

export default CategoryDetails;
