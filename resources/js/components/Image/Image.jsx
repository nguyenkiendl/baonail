import { UploadOutlined } from "@ant-design/icons";
import { Form, Modal, Upload } from "antd";
import { useState } from "react";
import notify from "~/utils/notify";
function Image() {
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    }
    const beforeUpload = (file) => {
        // Optional validation, like file type or size
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            notify.error("Error", "You can only upload JPG/PNG file!");
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notify.error("Error", "Image must be smaller than 2MB!");
            return false;
        }
        return false;
        //return isJpgOrPng && isLt2M;
    }
    const uploadButton = (
        <div>
            <UploadOutlined />
            <div>Upload</div>
        </div>
    );

    const props = {
        listType: "picture-card",
        handleChange,
        onRemove,
        beforeUpload,
        fileList,
        maxCount: 1,
        accept: ".jpg, .jpeg, .png",
        openFileDialogOnClick: true
    };
    return (
        <>
            <Form.Item
                label="Hình"
                name="file"
                valuePropName="fileList"
                getValueFromEvent={({ fileList }) => fileList}
                rules={[{ required: false, message: 'Please upload your avatar!' }]}
            >
                <Upload {...props}>
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </Form.Item>
        </>

    );
}

export default Image;