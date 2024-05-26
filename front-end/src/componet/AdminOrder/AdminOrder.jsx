import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Space, Table, message, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import OrderDetails from "./OrderDetails";

const AdminOrder = () => {
  const [refresh, setRefresh] = useState(false);
  const [orders, setOrders] = useState(null);
  const [modalChild, setModalChild] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          // const response = await getProductsAPI()
          // const productsData = response.data;
          // setProducts(productsData);
          // console.log(productsData);
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
      sorter: (a, b) => a.maHangHoa - b.maHangHoa,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("maDonHang"),
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      ellipsis: true,
      sorter: (a, b) => a.product - b.product,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("product"),
    },
    {
      title: "userId",
      key: "userId",
      ellipsis: true,
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      key: "ngayDat",
      ellipsis: true,
      sorter: (a, b) => a.tenHangHoa.localeCompare(b.tenHangHoa),
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

              setModalChild(<OrderDetails />);
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
      <Button onClick={() => setModalChild(<OrderDetails />)}>nghia</Button>
    </div>
  );
};
export default AdminOrder;
