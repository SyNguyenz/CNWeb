import React, { useState } from "react";
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import AdminUser from "../../componet/AdminUser/AdminUser";
import AdminProduct from "../../componet/AdminProduct/AdminProduct";
import boxImage from "./box.png";
import AdminOrder from "../../componet/AdminOrder/AdminOrder";

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
  getItem("Sản phẩm", "products", <ProductOutlined />, ),
  getItem("Người dùng", "users", <UserOutlined />, ),
  getItem("Đơn hàng", "orders", <img src={boxImage} alt="Order" width={14}/>),
];

const Admin = () => {
  const [keySelected, setKeySelected] = useState('products');

  const handleOnClick = ({ item, key, keyPath, domEvent }) => {
    setKeySelected(key);
    console.log('key=', key);
  };
  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )  
      case 'orders':
        return (
          <AdminOrder />
        )
      default:
        return <></>  
    }    
  }

  return (
    <div style={{ display: "flex" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[keySelected]}
        style={{
          minWidth: 150,
          maxWidth: 150,
          height: "100vh",
        }}
        items={items}
        onClick={handleOnClick}
      />
      <div>
        {renderPage(keySelected)}
      </div>
    </div>
  );
};
export default Admin;
