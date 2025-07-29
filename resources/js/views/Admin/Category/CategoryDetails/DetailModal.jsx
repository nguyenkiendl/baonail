import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";
import notify from "~/utils/notify";
import { CategoryContext } from "./CategoryDetails";
import categories from "~/store/categories";
import SelectFilter from "~/components/Form/SelectFilter";
const { TextArea } = Input;
function DetailModal() {
    const { cateId, productList, setDataSource, isOpen, setIsOpen } = useContext(CategoryContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setIsOpen(false);
    }
    const onFinish = (values) => {
        console.log(values);
        setLoading(true);
        categories
            .addPivotProduct(cateId, values)
            .then((response) => {
                if (response.success) {
                    setLoading(false);
                    setDataSource(response.data.datas);
                    notify.success("Thành công", response.message);
                } else {
                    setLoading(false);
                    notify.error("Thất bại", response.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                notify.error("Thất bại", error);
            });
        setIsOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue({
                ids: []
            });
        }
    }, [isOpen, form]);

    return (
        <>
            <Modal
                title="Thêm mới"
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
                            label="Sản phẩm"
                            name="ids"
                            rules={[
                                {
                                    required: true,
                                    message: "Chọn sản phẩm!",
                                },
                            ]}
                        >
                            {/* <Select
                                mode="multiple"
                                placeholder="Chọn sản phẩm"
                                style={{
                                    width: '100%',
                                }}
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.label ?? '').normalize('NFD').replace(/\p{M}+/gu, '').replace(/(Đ|đ)/g, 'd').toLowerCase().includes(input.toLowerCase())
                                }
                                options={productList.map(p => {
                                    return {
                                        value: p.id,
                                        label: p.name
                                    }
                                })}
                            /> */}
                            <SelectFilter
                                mode="multiple"
                                placeholder="Chọn sản phẩm"
                                style={{
                                    width: '100%',
                                }}
                                showSearch
                                options={productList.map(p => {
                                    return {
                                        value: p.id,
                                        label: p.name
                                    }
                                })}
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

export default DetailModal;
