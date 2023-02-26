import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './main.module.css';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
export default function SideBar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  const user = useSelector(state => state.user);
  return (
    <div className="App">
      var NewComponent = React.createClass(
      {
        <div>
          <title>Danh sách nhân viên | Quản trị Admin</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* Main CSS*/}
          <link rel="stylesheet" type="text/css" href="css/main.css" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
          />
          {/* or */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
          />
          {/* Font-icon css*/}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
          />
          {/* Navbar*/}
          <header className="app-header" style={{display: 'flex', justifyContent: 'end'}}>
            {/* Sidebar toggle button*/}
            <a
              className="app-sidebar__toggle"
              href="#"
              data-toggle="sidebar"
              aria-label="Hide Sidebar"
            />
            {/* Navbar Right Menu*/}
            <ul className="app-nav" style={{margin: 0}}>
              {/* User Menu*/}
              <li className="app-nav_li" style={{fontSize: 24, cursor: 'pointer', listStyleType: 'none', color: '#fff'}} onClick={handleLogOut}>
                <div className="app-nav__item">
                  <i className="bx bx-log-out bx-rotate-180" />{" "}
                </div>
              </li>
            </ul>
          </header>
          {/* Sidebar menu*/}
          <div className="app-sidebar__overlay" data-toggle="sidebar" />
          <aside className="app-sidebar">
            <div className="app-sidebar__user">
              <img
                className="app-sidebar__user-avatar"
                src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/anh-anime-chibi.jpg?resize=560%2C560&ssl=1"
                width="50px"
                alt="User Image"
              />
              <div>
                <p className="app-sidebar__user-name">
                  <b>{user.fullName}</b>
                </p>
              </div>
            </div>
            <hr style={{margin: 0}}/>
            <ul className="app-menu " style={{paddingLeft: 0}}>
              <li>
                <Link
                  className={clsx(styles.app_menu__item,{
                    [styles.active]: false
                  })}
                  to="/admin/account"
                >
                  <i className="app-menu__icon bx bx-id-card" />
                  <span className="app-menu__label">Quản lý tài khoản</span>
                </Link>
              </li>
              <li>
                <Link className={clsx(styles.app_menu__item,{
                    [styles.active]: false
                  })} to="/admin/product">
                  <i className="app-menu__icon bx bx-purchase-tag-alt" />
                  <span className="app-menu__label">Quản lý sản phẩm</span>
                </Link>
              </li>
              <li>
                <Link className={clsx(styles.app_menu__item,{
                    [styles.active]: false
                  })} to="/admin/order">
                  <i className="app-menu__icon bx bx-task" />
                  <span className="app-menu__label">Quản lý đơn hàng</span>
                </Link>
              </li>
              <li>
                <Link className={clsx(styles.app_menu__item,{
                    [styles.active]: false
                  })} to="/admin/brand">
                  <i className="app-menu__icon bx bx-run" />
                  <span className="app-menu__label">Quản lý thương hiệu</span>
                </Link>
              </li>
              <li>
                <Link className={clsx(styles.app_menu__item,{
                    [styles.active]: false
                  })} to="/admin/category">
                  <i className="app-menu__icon bx bx-category" />
                  <span className="app-menu__label">Quản lý danh mục</span>
                </Link>
              </li>
              <li>
                <Link className={clsx(styles.app_menu__item,{
                    [styles.active]: false
                  })} to="/admin/image">
                  <i className="app-menu__icon bx bx-image" />
                  <span className="app-menu__label">Quản lý hình ảnh</span>
                </Link>
              </li>
              <li>
                <Link className={clsx(styles.app_menu__item,{
                    [styles.active]: false
                  })} to="/admin/report">
                  <i className="app-menu__icon bx bx-pie-chart-alt-2" />
                  <span className="app-menu__label">Báo cáo doanh thu</span>
                </Link>
              </li>
            </ul>
          </aside>
        </div>
         }
         );
        </div>
    );
}