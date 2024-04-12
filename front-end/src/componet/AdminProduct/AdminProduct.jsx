import React, { useState } from 'react';
import { Button, Space, Table } from 'antd';
const data = [
  {
      key: '1',
      maHangHoa: 'DT001',
      tenHangHoa: 'Điện thoại di động',
      gia: 15000000,  // Giá 15 triệu đồng
      giamGia: 0.1,   // Giảm giá 10%
      soLuongTon: 100,
      rating: 4.8
  },
  {
      key: '2',
      maHangHoa: 'MT001',
      tenHangHoa: 'Máy tính xách tay',
      gia: 25000000,  // Giá 25 triệu đồng
      giamGia: 0.15,  // Giảm giá 15%
      soLuongTon: 50,
      rating: 4.7
  },
  {
      key: '3',
      maHangHoa: 'TN001',
      tenHangHoa: 'Tai nghe không dây',
      gia: 3500000,   // Giá 3.5 triệu đồng
      giamGia: 0.05,  // Giảm giá 5%
      soLuongTon: 200,
      rating: 4.9
  },
  {
      key: '4',
      maHangHoa: 'MT002',
      tenHangHoa: 'Máy tính để bàn',
      gia: 18000000,  // Giá 18 triệu đồng
      giamGia: 0.12,  // Giảm giá 12%
      soLuongTon: 80,
      rating: 4.5
  },
  {
      key: '5',
      maHangHoa: 'DS001',
      tenHangHoa: 'Màn hình cong OLED',
      gia: 12000000,  // Giá 12 triệu đồng
      giamGia: 0.08,  // Giảm giá 8%
      soLuongTon: 60,
      rating: 4.7
  },
  {
      key: '6',
      maHangHoa: 'DP001',
      tenHangHoa: 'Dây cáp sạc nhanh',
      gia: 500000,    // Giá 500 nghìn đồng
      giamGia: 0.0,   // Không giảm giá
      soLuongTon: 300,
      rating: 4.8
  },
  {
      key: '7',
      maHangHoa: 'SM001',
      tenHangHoa: 'Smartwatch',
      gia: 8000000,   // Giá 8 triệu đồng
      giamGia: 0.1,   // Giảm giá 10%
      soLuongTon: 120,
      rating: 4.6
  },
  {
      key: '8',
      maHangHoa: 'MS001',
      tenHangHoa: 'Mouse gaming',
      gia: 1200000,   // Giá 1.2 triệu đồng
      giamGia: 0.0,   // Không giảm giá
      soLuongTon: 180,
      rating: 4.9
  },
  {
      key: '9',
      maHangHoa: 'KB001',
      tenHangHoa: 'Bàn phím cơ',
      gia: 1500000,   // Giá 1.5 triệu đồng
      giamGia: 0.05,  // Giảm giá 5%
      soLuongTon: 90,
      rating: 4.8
  },
  {
      key: '10',
      maHangHoa: 'TS001',
      tenHangHoa: 'Tai nghe gaming',
      gia: 2500000,   // Giá 2.5 triệu đồng
      giamGia: 0.1,   // Giảm giá 10%
      soLuongTon: 150,
      rating: 4.7
  },
  {
      key: '11',
      maHangHoa: 'MT003',
      tenHangHoa: 'Máy tính bảng',
      gia: 6000000,   // Giá 6 triệu đồng
      giamGia: 0.0,   // Không giảm giá
      soLuongTon: 70,
      rating: 4.5
  },
  {
      key: '12',
      maHangHoa: 'PS001',
      tenHangHoa: 'Pin dự phòng',
      gia: 800000,    // Giá 800 nghìn đồng
      giamGia: 0.0,   // Không giảm giá
      soLuongTon: 200,
      rating: 4.8
  },
  {
      key: '13',
      maHangHoa: 'CV001',
      tenHangHoa: 'Camera an ninh',
      gia: 3000000,   // Giá 3 triệu đồng
      giamGia: 0.15,  // Giảm giá 15%
      soLuongTon: 40,
      rating: 4.6
  },
  {
      key: '14',
      maHangHoa: 'MS002',
      tenHangHoa: 'Màn hình máy tính',
      gia: 5000000,   // Giá 5 triệu đồng
      giamGia: 0.0,   // Không giảm giá
      soLuongTon: 100,
      rating: 4.7
  },
  {
      key: '15',
      maHangHoa: 'TN002',
      tenHangHoa: 'Tai nghe Bluetooth',
      gia: 2000000,   // Giá 2 triệu đồng
      giamGia: 0.1,   // Giảm giá 10%
      soLuongTon: 150,
      rating: 4.6
  }
];

const AdminProduct = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'maHangHoa',
      key: 'ma',
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      // ],
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Tên',
      dataIndex: 'tenHangHoa',
      key: 'ten',
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Giá',
      dataIndex: 'gia',
      key: 'gia',
      ellipsis: true,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'giamGia',
      key: 'giamGia',
      ellipsis: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuongTon',
      key: 'soLuongTon',
      ellipsis: true,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default AdminProduct;