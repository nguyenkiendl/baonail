import classNames from 'classnames/bind';
import styles from './NavAdmin.module.scss';
const cx = classNames.bind(styles);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faGears, faList, faStore, faTent } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NavAdmin() {
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState('/super-admin');

    useEffect(() => {
        setActive(location.pathname);
    }, ['/']);

    const handleChangeNav = (active) => {
        setActive(active);
        navigate(active);
    };

    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                ]}
            />
        </>
    );
}

export default NavAdmin;
