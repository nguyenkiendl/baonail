import { PlusOutlined } from "@ant-design/icons";
import React, { createContext, useEffect, useState } from "react";
import UserList from "./UserList";
import UserModal from "./UserModal";
import PageHeader from "~/components/PageHeader";
export const UserContext = createContext({});
function User() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [load, setLoad] = useState(false);

    const handleClickAdd = (e) => {
        e.preventDefault();
        setFormData({
            name: "",
            username: "",
            email: "",
            role_id: 2,
            status: "Active",
            password: "",
            password_confirmation: "",
        });
        setIsOpen(true);
    };

    const handleEdit = (item) => {
        setFormData({ ...item, role_id: item.role_id });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const finishSubmitForm = (type, item) => {
        if (type == "add") {
            setLoad(!load);
        } else if (type == "update") {
            setDataSource((prevDatas) => {
                const newDatas = prevDatas.map((obj) => {
                    if (obj.id === item?.id) {
                        return item;
                    }
                    return obj;
                });
                return newDatas;
            });
        }
        setIsOpen(false);
    };

    return (
        <>
            <UserContext.Provider
                value={{
                    dataSource: dataSource,
                    setDataSource: setDataSource,
                    load: load,
                    setLoad: setLoad,
                }}
            >
                <PageHeader
                    title="Danh sách tài khoản"
                    subTitle="Danh sách tài khoản"
                    onClick={handleClickAdd}
                />
                <UserModal
                    isOpen={isOpen}
                    initialValues={formData}
                    onSubmit={finishSubmitForm}
                    onCancel={closeModal}
                />
                <UserList onEdit={handleEdit} />
            </UserContext.Provider>
        </>
    );
}

export default User;
