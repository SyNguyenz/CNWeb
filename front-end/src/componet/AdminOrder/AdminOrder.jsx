import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Space, Table, message, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import OrderDetails from "./OrderDetails";
import AllApi from '../../api/api';

function formatDate(isoString) {
  // Chuyển đổi chuỗi ISO 8601 thành đối tượng Date
  const date = new Date(isoString);

  // Lấy các thành phần của ngày và giờ theo giờ địa phương
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về giá trị từ 0 đến 11
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Định dạng thành chuỗi theo định dạng DD/MM/YYYY HH:MM:SS
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


const AdminOrder = () => {
  const [refresh, setRefresh] = useState(false);
  const [orders, setOrders] = useState(null);
  const [modalChild, setModalChild] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
           const response = await AllApi.getAllOrder();
           console.log(response.data);
           const ordersData = response.data.map(order => ({
            maDonHang: order.maDonHang,
            userName: order.user.userName,
            ngayDat: formatDate(order.ngayDat),
            ngayGiao: order.ngayGiao ? formatDate(order.ngayGiao) : "Chưa xác định",
            tinhTrangDonHang: order.tinhTrangDonHang ? "Đã thanh toán" : "Chưa thanh toán",
            order: order,
          }));

           setOrders(ordersData);
           console.log(ordersData);
        } catch (error) {
          console.error(error);
          message.error('Không thể lấy dữ liệu đơn hàng!');
        }
    };

    fetchData();
  }, [refresh]);

  const onRefresh = () => {
    setRefresh(prev => !prev);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
              setSearchText("");
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
          color: filtered ? "#1677ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Mã",
      dataIndex: "maDonHang",
      key: "ma",
      ellipsis: true,
      sorter: (a, b) => a.maDonHang - b.maDonHang,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "User name",
      dataIndex: "userName",
      key: "userName",
      ellipsis: true,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      key: "ngayDat",
      sorter: (a, b) => a.ngayDat.localeCompare(b.ngayDat),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("ngayDat"),
    },
    {
      title: "Ngày giao",
      dataIndex: "ngayGiao",
      key: "ngayGiao",
      ellipsis: true,
      sorter: (a, b) => a.ngayGiao.localeCompare(b.ngayGiao),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhTrangDonHang",
      key: "tinhTrang",
      ellipsis: true,
      sorter: (a, b) => a.tinhTrangDonHang.localeCompare(b.tinhTrangDonHang),
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <div>
      <Modal
        title={false}
        centered
        open={modalChild !== null}
        onCancel={() => setModalChild(null)}
        maskClosable={false}
        footer={null}
        destroyOnClose={true}
        width="auto"
      >
        {modalChild}
      </Modal>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setModalChild(<OrderDetails order={record.order} handleRefresh={onRefresh} />);
            },
            onMouseEnter: (event) => {
              event.currentTarget.style.cursor = "pointer";
            },
            onMouseLeave: (event) => {
              event.currentTarget.style.cursor = "default";
            },
          };
        }}
        columns={columns}
        dataSource={orders}
      />
    </div>
  );
};
export default AdminOrder;
