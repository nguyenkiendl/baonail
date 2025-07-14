import classNames from 'classnames/bind';
import styles from './NavMain.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap, faTent, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

function NavMain() {
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState('bbq');

    useEffect(() => {
        console.log(location);
        //setActive(location.pathname);
    }, []);

    const handleChangeNav = (active) => {
        setActive(active);
        navigate(active);
    };

    return (
        <>
            <div className={cx('navmain')}>
                <div className={cx('navmain-row')}>
                    <button
                        className={cx('btn-product', { active: active === '/product' })}
                        onClick={() => handleChangeNav('/product')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faProductHunt} />
                        </span>
                        <span>PRODUCT</span>
                    </button>
                    <button className={cx('btn-tick', { active: active === '/' })} onClick={() => handleChangeNav('/')}>
                        <span>
                            <FontAwesomeIcon icon={faTicket} />
                        </span>
                        <span>TICKET</span>
                    </button>

                    <button
                        className={cx('btn-camp-map', { active: active === '/camp-plan' })}
                        onClick={() => handleChangeNav('/camp-plan')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faTent} />
                        </span>
                        <span>CAMPING</span>
                    </button>
                    <button
                        className={cx('btn-table-map', { active: active === '/table-plan' })}
                        onClick={() => handleChangeNav('/table-plan')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faSitemap} />
                        </span>
                        <span>Sơ Đồ Bàn</span>
                    </button>
                </div>
                <br></br>
            </div>
        </>
    );
}

export default NavMain;
