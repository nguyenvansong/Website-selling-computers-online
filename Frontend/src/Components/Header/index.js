import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Search from '../Search'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faAddressCard, faBagShopping, faBell,faCartShopping,faHouse,faLaptop, faTableList} from '@fortawesome/free-solid-svg-icons';
import {faCircleQuestion,faCircleUser} from '@fortawesome/free-regular-svg-icons';

import clsx from 'clsx';
import styles from './header.module.scss';

import logo from '../../assets/images/logo.png';
import product1 from '../../assets/images/product1.jpg';

function Header(){
    const [count, setCount] = useState(0);
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        const total = cart.reduce((count,item) => {
            return count + 1;
        },0)
        setCount(total);
    },[cart.length])

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <>
            <div className={clsx(styles.wrap_header)}>
                <div className={clsx(styles.header,styles.mg_left_right)}>
                    <div className={clsx(styles.header_content_top)}>
                    <div className={clsx(styles.header_content_top_1)}>
                        <span className={clsx(styles.header_contact)}>Kết nối</span>
                        <div>
                            <a href='https://www.facebook.com/profile.php?id=100034119513302'>
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                        <div>
                            <a href='https://www.instagram.com/le_huy_dat01/?igshid=YmMyMTA2M2Y%3D&fbclid=IwAR2jkF8LK6YSnr2RVLZua7LX59kr7chrEc6Mbyz77uIVNo3-G82jN-RPA2M'>
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                    <div className={clsx(styles.header_content_top_2)}>
                        <div className={clsx(styles.wrap_notification)}>
                            <div className={clsx(styles.item_head)}>
                                <FontAwesomeIcon icon={faBell} />
                                <span className={clsx(styles.item_notification)}>Thông báo</span>
                            </div>
                            <div className={clsx(styles.notification)}>
                                <div className={clsx(styles.title)}>
                                    <span>Thông báo mới nhận</span>
                                </div>
                                <div className={clsx(styles.content)}>
                                    <ul className={clsx(styles.list)}>
                                        <li className={clsx(styles.item)}>
                                            <img src={product1} alt className={clsx(styles.image)} />
                                            <div className={clsx(styles.wrap)}>
                                                <span className={clsx(styles.title)}>Mã đến 100000đ mua gì cũng giảm</span>
                                                <p>Thêm hàng nghìn vocher 20000đ. Giảm 50% toàn bộ sản phẩm</p>
                                            </div>
                                        </li>
                                        <li className={clsx(styles.item)}>
                                            <img src={product1} alt className={clsx(styles.image)} />
                                            <div className={clsx(styles.wrap)}>
                                                <span className={clsx(styles.title)}>Mã đến 100000đ mua gì cũng giảm</span>
                                                <p>Thêm hàng nghìn vocher 20000đ. Giảm 50% toàn bộ sản phẩm</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <span>|</span>
                        <div className={clsx(styles.item_head)}>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                            <span className={clsx(styles.item_help)}>Hỗ trợ</span>
                        </div>
                    </div>
                </div>
                    <div className={clsx(styles.header_main)}>
                        <div className={clsx(styles.header_logo)}>
                            <Link to="/">
                                <img src={logo} alt="" className={clsx(styles.logo)}/>
                            </Link>
                        </div>
                        <div className={clsx(styles.search_wrap)}>
                            <Search />
                        </div>
                        <div className={clsx(styles.header_log, {
                            'hide': localStorage.getItem('token') ? true : false
                        })}>
                            <Link to="/register" className={clsx(styles.header_log_left)}>Đăng ký</Link>
                                <span>|</span>
                            <Link to="/login" className={clsx(styles.header_log_right)}>Đăng nhập</Link>
                        </div>
                        <div className={clsx(styles.header_log,{
                            'hide': localStorage.getItem('token') ? false : true
                        })}>
                            <Link to="/cart" className={clsx(styles.header_log_left)}>
                                <div>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    {
                                        count ? <span>{count}</span> : <></>
                                    }
                                </div>
                            </Link>
                            <span>|</span>
                            <Tippy
                                interactive={true}
                                placement="bottom"
                                render={attrs => (
                                    <div className={clsx(styles.box)} tabIndex="-1" {...attrs}>
                                      <div className={clsx(styles.account_info)}>
                                        <div className={clsx(styles.account_info_item)}>
                                            <Link to="/update-account">
                                                <span>Thay đổi thông tin tài khoản</span>
                                            </Link>
                                        </div>
                                        <div className={clsx(styles.account_info_item)}>
                                            <Link to="/list-order">
                                                <span>Xem danh sách hóa đơn</span>
                                            </Link>
                                        </div>

                                        <div className={clsx(styles.account_info_item)} onClick={handleLogOut}>
                                            <span>Đăng xuất</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                            >
                                <a href="" className={clsx(styles.header_log_right)}>
                                    <FontAwesomeIcon icon={faCircleUser} />
                                    <span>{user.fullName}</span>
                                </a>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.category_main)}>
                <ul className={clsx(styles.category_list, styles.mg_left_right)}>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faHouse} />
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faLaptop} />
                        <Link to="/laptop/laptopacer">Laptop Acer</Link>
                    </li>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faLaptop} />
                        <Link to="/laptop/laptopasus">Laptop Asus</Link>
                    </li>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faLaptop} />
                        <Link to="/laptop/laptopdell">Laptop Dell</Link>
                    </li>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faLaptop} />
                        <Link to="/laptop/laptophp">Laptop HP</Link>
                    </li>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faBagShopping} />
                        <Link to="/khuyenmai">Khuyến mãi</Link>
                    </li>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faTableList} />
                        <Link to="/tintuc">Tin tức</Link>
                    </li>
                    <li className={clsx(styles.category_item)}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        <Link to="/lienhe">Liên hệ</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header;