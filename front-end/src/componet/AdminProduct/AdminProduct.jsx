import React, { useRef, useState } from "react";
import { Button, Modal, Space, Table, message, Input } from "antd";
import {
  PlusCircleFilled,
  DeleteFilled,
  ExclamationCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import AddProduct from "./AddProduct";
import ProductDetails from "./ProductDetails";
import data from "./demoData";

const AdminProduct = () => {
  const [products, setProducts] = useState(data);
  const [modalChild, setModalChild] = useState(null);

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

  const deleteProduct = (record) => {
    // Thực hiện xóa sản phẩm

    const updatedProducts = products.filter(
      (product) => product.key !== record.key
    ); // Lọc ra các sản phẩm khác với sản phẩm cần xóa
    setProducts(updatedProducts);
    message.success(`Đã xóa sản phẩm: ${record.tenHangHoa}`);
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };


  const { confirm } = Modal;
  const showDeleteConfirm = (product) => {
    confirm({
      title: `Xác nhận xóa sản phẩm ${product.tenHangHoa}!`,
      icon: <ExclamationCircleFilled />,
      content: `Mã sản phẩm: ${product.maHangHoa}`,
      onOk() {
        deleteProduct(product);
      },
      onCancel() {},
    });
  };
  const addProduct = () => {};
  const columns = [
    {
      title: "Mã",
      dataIndex: "maHangHoa",
      key: "ma",
      ellipsis: true,
      sorter: (a, b) => a.maHangHoa.localeCompare(b.maHangHoa),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('maHangHoa'),
    },
    {
      title: "Tên",
      dataIndex: "tenHangHoa",
      key: "ten",
      ellipsis: true,
      sorter: (a, b) => a.tenHangHoa.localeCompare(b.tenHangHoa),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('tenHangHoa'),
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      render: (text) => formatCurrency(text),
      ellipsis: true,
      sorter: (a, b) => a.gia - b.gia,
      sortDirections: ['descend', 'ascend'],
    },
    // {
    //   title: "Giảm giá",
    //   dataIndex: "giamGia",
    //   key: "giamGia",
    //   ellipsis: true,
    // },
    {
      title: "Số lượng",
      dataIndex: "soLuongTon",
      key: "soLuongTon",
      ellipsis: true,
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
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
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={()=>setModalChild(<AddProduct setModalChild={setModalChild} />)}>
          <PlusCircleFilled />
          Thêm sản phẩm
        </Button>
      </Space>

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
              console.log(record);
              setModalChild(<ProductDetails product={record} setModalChild={setModalChild} />);
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
        dataSource={products}
      />
    </div>
  );
};
export default AdminProduct;
