import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Space, Table, message, Input } from "antd";
import { SearchOutlined, DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import OrderDetails from "./OrderDetails";
import AllApi from '../../api/api'

const AdminOrder = () => {
  const [refresh, setRefresh] = useState(false);
  const [orders, setOrders] = useState(null);
  const [modalChild, setModalChild] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
           const response = await AllApi.getAllOrder()
           const ordersData = response.data;
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
  const deleteOrder = async (record) => {
    try {
      await AllApi.deleteOrder(record.maDonHang);
  
      const updatedOrders = orders.filter(
        (order) => order.maDonHang !== record.maDonHang
      );
      setOrders(updatedOrders);
      message.success(`Đã xóa đơn hàng của: ${record.user.userName}`);
    } catch (error) {
      console.error(error);
      message.error(`Xóa đơn hàng thất bại: Mã ${record.maDonHang}`);
    }
  };
  const showDeleteConfirm = (order) => {
    confirm({
      title: `Xác nhận xóa đơn hàng của ${order.user.userName}!`,
      icon: <ExclamationCircleFilled />,
      content: `Mã đơn hang: ${order.maDonHang}`,
      onOk() {
        deleteOrder(order);
      },
      onCancel() {},
    });
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

  const { confirm } = Modal;
  //   const showDeleteConfirm = (product) => {
  //     confirm({
  //       title: `Xác nhận xóa sản phẩm ${product.tenHangHoa}!`,
  //       icon: <ExclamationCircleFilled />,
  //       content: `Mã sản phẩm: ${product.maHangHoa}`,
  //       onOk() {
  //         deleteProduct(product);
  //       },
  //       onCancel() {},
  //     });
  //   };
  const addProduct = () => {};
  const columns = [
    {
      title: "Mã",
      dataIndex: "maDonHang",
      key: "ma",
      ellipsis: true,
      sorter: (a, b) => a.maDonHang - b.maDonHang,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("maDonHang"),
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
      ellipsis: true,
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      key: "ngayDat",
      ellipsis: true,
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
      ...getColumnSearchProps("loaiHangHoa"),
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhTrangDonHang",
      key: "tinhTrang",
      render: (text) => text,
      ellipsis: true,
      sorter: (a, b) => a.tinhTrangDonHang - b.tinhTrangDonHang,
      sortDirections: ["descend", "ascend"],
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

              setModalChild(<OrderDetails order={record} />);
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
      <Button onClick={() => setModalChild(<OrderDetails />)}>Xem chi tiết</Button>
    </div>
  );
};
export default AdminOrder;
