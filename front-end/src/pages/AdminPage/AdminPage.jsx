import React, { useEffect, useState } from "react";
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { Avatar, Button, Menu } from "antd";
import AdminUser from "../../componet/AdminUser/AdminUser";
import AdminProduct from "../../componet/AdminProduct/AdminProduct";
import boxImage from "./box.png";
import AdminOrder from "../../componet/AdminOrder/AdminOrder";
import styles from "./AdminPage.module.css";

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
  })
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
        <Button ghost onClick={() => logout()}>Đăng xuất</Button>
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
