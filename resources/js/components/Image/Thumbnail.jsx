import { Modal } from "antd";
import React, { useState } from "react";
const Thumbnail = React.memo(function Thumbnail({ file }) {
    const image = file != '' ? `/uploads/${file}` : '/default.jpg';
    const thumbnail = file != '' ? `/uploads/thumbnails/${file}` : '/default.jpg';
    const url = thumbnail != '' ? thumbnail : '/default.jpg';
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlePreview = async () => {
        setAvatarUrl(image);
        setIsModalOpen(true);
    };
    return (
        <>
            <a onClick={handlePreview}>
                <img src={url} width={50} height={50} style={{
                    objectFit: 'cover'
                }} />
            </a>
            <Modal
                title="Hình ảnh chi tiết"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null} // Disable footer
                header={null} // Disable header
                width={650}
                style={{
                    maxHeight: 'calc(100vh -150px)',
                    overflow: 'hidden'
                }}
            >
                <img
                    src={avatarUrl}
                    alt="avatar"
                    style={{
                        width: '100%',
                        maxHeight: 'calc(100vh - 250px)',
                        objectFit: 'contain'
                    }}
                />
            </Modal>
        </>
    );
}, (prevProps, nextProps) => prevProps.file === nextProps.file);

export default Thumbnail;