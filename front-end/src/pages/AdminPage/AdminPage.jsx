import React, { useEffect, useState } from "react";
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Menu } from "antd";
import AdminUser from "../../componet/AdminUser/AdminUser";
import AdminProduct from "../../componet/AdminProduct/AdminProduct";
import boxImage from "./box.png";
import AdminOrder from "../../componet/AdminOrder/AdminOrder";
import styles from "./AdminPage.module.css";
import useSignalR from "../../components/useSignalR/useSignalR";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const logout = () => {
  console.log("User logged out");
  localStorage.clear();
  window.location.href = "/";
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Sản phẩm", "products", <ProductOutlined />),
  getItem("Người dùng", "users", <UserOutlined />),
  getItem("Đơn hàng", "orders", <img src={boxImage} alt="Order" width={14} />),
];
const Admin = () => {
  useEffect(() => {
    const role = localStorage.getItem("role");
    if(role !== "admin") window.location.href = "/";
  });
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isRead, setIsRead] = useState(true); 
  const showMessage = (msg) => {
      setMessage(msg);
      setVisible(false); 
      setIsRead(false);
    };
    useSignalR(showMessage, "admin");
  const handleNewMessage = () => {
  //khi có thông báo mới thì setIsRead(false) để hiện dấu chấm đỏ
  setIsRead(true);
  if(message !== ''){
      setVisible(!visible);
  }
};

  const [keySelected, setKeySelected] = useState("products");

  const handleOnClick = ({ item, key, keyPath, domEvent }) => {
    setKeySelected(key);
    console.log("key=", key);
  };
  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <AdminUser />;
      case "products":
        return <AdminProduct />;
      case "orders":
        return <AdminOrder />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Admin</h1>
        <div style={{display: "flex", alignItems: "center"}}>
          <div className="notification-icon">
            <Tippy
              interactive={true}
              visible={visible}
              placement="bottom"
              onClickOutside={() => setVisible(false)}
              render={attrs => (
                <div className="tooltip-noti" {...attrs}>
                  {message}
                </div>
              )}
            >
              <button onClick={handleNewMessage} className="notification-icon">
                <FontAwesomeIcon icon={faBell} className='icon-noti'/>
                {!isRead && <div className="unread-dot"> * </div>} {/* Hiển thị chấm đỏ nếu thông báo chưa đọc */}
              </button>
            </Tippy>
          </div>
          <Button ghost onClick={() => logout()}>Đăng xuất</Button>
        </div>
      </header>
      <div style={{ display: "flex", paddingTop: "60px" }}>
        <div className={styles.menuContainer}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[keySelected]}
            style={{height: "100%"}}
            items={items}
            onClick={handleOnClick}
          />
        </div>
        <div className={styles.content}>{renderPage(keySelected)}</div>
      </div>
    </>
  );
};
export default Admin;
