import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Input,
    Popconfirm,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import posts from "~/store/posts";
import notify from "~/utils/notify";
import { useParams } from "react-router-dom";
import Navcrumb from "./Navcrumb";
import Thumbnail from "~/components/Image/Thumbnail";
import { formatPrice, removeVietnameseTones, round } from "~/utils/filters";
import TopHeader from "~/components/TopHeader";
const { Text, Link } = Typography;
function Post() {
    const queryParameters = new URLSearchParams(window.location.search);
    const family = queryParameters.get("family");
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [families, setFamilies] = useState([]);
    const [categories, setCategories] = useState([]);

    const [filters, setFilters] = useState({ name: "" });

    const [activeTab, setActiveTab] = useState([]);

    const fetchData = () => {
        setLoading(true);
        posts.getDatas().then((response) => {
            if (response.posts) {
                setDataSource(response.posts);
            }
            if (response.categories) {
                setCategories(response.categories);
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, [load]);

    useEffect(() => {
        if (family) {
            setActiveTab(family);
        }
    }, [family]);

    const handleClickAdd = (e) => {
        setFormData({
            title: "",
            content: "",
            file: "",
            category: null,
            category_name: "",
        });
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
            posts
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

    const handleChangeTitle = (valueName) => {
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

    const handleTabControl = (family_id) => {
        setActiveTab(family_id);
        history.pushState({}, "", `?family=${family_id}`);
    };

    return (
        <>
            <TopHeader
                title="Danh sách bài viết"
                extra={
                    <Space wrap>
                        <Button
                            key="all"
                            size="small"
                            onClick={() => handleTabControl(0)}
                            style={{
                                backgroundColor:
                                    activeTab == 0 ? "#1890ff" : "#fff",
                                color: activeTab == 0 ? "#fff" : "#000",
                            }}
                        >
                            Tất cả
                        </Button>
                        {families.map((t, i) => {
                            return (
                                <Button
                                    key={i}
                                    size="small"
                                    onClick={() => handleTabControl(t.id)}
                                    style={{
                                        backgroundColor:
                                            activeTab == t.id
                                                ? "#1890ff"
                                                : "#fff",
                                        color:
                                            activeTab == t.id ? "#fff" : "#000",
                                    }}
                                >
                                    {t.name}
                                </Button>
                            );
                        })}
                        <Button
                            type="primary"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={handleClickAdd}
                        >
                            Thêm bài mới
                        </Button>
                    </Space>
                }
            />
            <Card size="small" style={{ marginBottom: 0 }}>
                <PostModal
                    isOpen={isOpen}
                    initialValues={formData}
                    categories={categories}
                    onSubmit={finishSubmitForm}
                    onCancel={closeModal}
                />
                <Table
                    rowKey={(record) => record.id}
                    dataSource={filteredData}
                    loading={loading}
                    pagination={false}
                    scroll={{
                        x: 1024,
                        y: "69vh",
                    }}
                    bordered
                >
                    <Table.Column
                        title="STT"
                        dataIndex="index"
                        key="index"
                        width={50}
                        align="center"
                        render={(text, record, index) => (
                            <span>{index + 1}</span>
                        )}
                    />
                    <Table.Column
                        title="HÌNH ẢNH"
                        dataIndex="thumbnail"
                        key="thumbnail"
                        width={80}
                        align="center"
                        render={(text, record, index) => {
                            return <Thumbnail file={record.file} />;
                        }}
                    />
                    <Table.Column
                        title={() => (
                            <Input
                                allowClear
                                placeholder="TIÊU ĐỀ"
                                value={filters.name}
                                onChange={(e) =>
                                    handleChangeTitle(e.target.value)
                                }
                            />
                        )}
                        //title="TÊN NGUYÊN LIỆU"
                        dataIndex="title"
                        key="title"
                        width={150}
                        render={(value, record, index) => {
                            return (
                                <>
                                    {value ? (
                                        <>
                                            <a>{value}</a>
                                            <br></br>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </>
                            );
                        }}
                    />

                    <Table.Column
                        title="DANH MỤC"
                        dataIndex="category_name"
                        key="categoryName"
                        align="center"
                        width={120}
                        render={(categoryName, record) => (
                            <span>
                                <Tag>{categoryName}</Tag>
                            </span>
                        )}
                    />
                    <Table.Column
                        title="HÀNH ĐỘNG"
                        dataIndex="action"
                        key="action"
                        width={120}
                        align="center"
                        render={(text, record) => {
                            return (
                                <>
                                    <Space>
                                        <Button
                                            size="small"
                                            type="primary"
                                            onClick={() => handleEdit(record)}
                                        >
                                            Chỉnh sửa
                                        </Button>
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

export default Post;
