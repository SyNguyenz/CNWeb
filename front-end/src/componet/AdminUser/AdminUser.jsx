import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Space, Table, message, Input } from "antd";
import {
  DeleteFilled,
  ExclamationCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { deleteUserAPI, getUsersAPI } from "./API";
const usersData = [
  {
    userId: 1,
    userName: "John Doe",
    phoneNumber: "123456789",
    diaChi: "123 Main Street, City, Country",
  },
  {
    userId: 2,
    userName: "Jane Smith",
    phoneNumber: "987654321",
    diaChi: "456 Elm Street, Town, Country",
  },
];

const AdminUser = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsersAPI();
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        console.error(error);
        message.error('Không thể lấy dữ liệu user');
      }
    };

    fetchData();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && clearFilters();
              confirm();
              setSearchText('');
              setSearchedColumn(dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const deleteUser = async (record) => {
    try {
      await deleteUserAPI(record.id);
  
      const updatedUsers = users.filter(
        (user) => user.id !== record.id
      );
      setUsers(updatedUsers);
  
      message.success(`Đã xóa user: ${record.id}`);
    } catch (error) {
      console.error(error);
      message.error(`Xóa user thất bại: ${record.id}`);
    }
  };

  const { confirm } = Modal;
  const showDeleteConfirm = (user) => {
    confirm({
      title: `Xác nhận xóa user ${user.id}!`,
      icon: <ExclamationCircleFilled />,
      content: `User name: ${user.userName}`,
      onOk() {
        deleteUser(user);
      },
      onCancel() {},
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('id'),
    },
    {
      title: "User name",
      dataIndex: "userName",
      key: "name",
      ellipsis: true,
      ...getColumnSearchProps('userName'),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
      ...getColumnSearchProps('phoneNumber'),
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
      ellipsis: true,
      ...getColumnSearchProps('diaChi'),
    },
    {
      width: 62,
      render: (_, record) => (
        <Button
          style={{transform: "scale(1.5,1.5)"}}
          type="text"
          size="small"
          shape="circle"
          danger
          icon={<DeleteFilled />}
          onClick={(e) => {
            e.stopPropagation();
            showDeleteConfirm(record);
          }}
        />
      ),
    },
  ];
  return (
    <div style={{paddingLeft: 8}}>
      <Table
        columns={columns}
        dataSource={users}
      />
    </div>
  );
};
export default AdminUser;
