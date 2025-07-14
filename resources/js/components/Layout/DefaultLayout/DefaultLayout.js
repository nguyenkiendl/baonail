import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import authService from '~/services/authService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
