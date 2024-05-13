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
// const getLevelKeys = (items1) => {
//   const key = {};
//   const func = (items2, level = 1) => {
//     items2.forEach((item) => {
//       if (item.key) {
//         key[item.key] = level;
//       }
//       if (item.children) {
//         return func(item.children, level + 1);
//       }
//     });
//   };
//   func(items1);
//   return key;
// };
// const levelKeys = getLevelKeys(items);
const Admin = () => {
  const [keySelected, setKeySelected] = useState('users');

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
          width: 256,
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
