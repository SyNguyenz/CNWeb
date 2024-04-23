import React, { useState } from "react";
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import AdminUser from "../../componet/AdminUser/AdminUser";
import AdminProduct from "../../componet/AdminProduct/AdminProduct";
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
];

const App = () => {
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
export default App;
