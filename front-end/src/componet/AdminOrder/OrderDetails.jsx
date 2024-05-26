import {
  EditOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Modal,
  Row,
  Table,
  Tag,
  message,
} from "antd";
import React, { useState } from "react";
import { mockOrder, mockUser, mockProduct, mockVariant } from "./mockData";

const tagStyle = {
  height: "38px",
  lineHeight: "38px",
  fontSize: "16px",
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const Row2 = ({ label, value }) => (
  <Row gutter={[16, 16]}>
    <Col span={1}></Col>
    <Col span={4} style={{ fontSize: 16, color: "#929292" }}>
      {label}:
    </Col>
    <Col span={16} style={{ fontSize: 18 }}>
      {value}
    </Col>
  </Row>
);

const Row1 = ({ label, value }) => (
  <Row gutter={[16, 16]}>
    <Col span={4} style={{ fontSize: 16 }}>
      {label}:
    </Col>
    <Col span={20} style={{ fontSize: 18 }}>
      {value}
    </Col>
  </Row>
);
const statusItems = [
  {
    label: "Đã thanh toán",
    key: true,
  },
  {
    label: "Chưa thanh toán",
    key: false,
  },
];
const deliveryStatusItems = [
  {
    label: "Giao thành công",
    key: 2,
  },
  {
    label: "Đang giao",
    key: 1,
  },
  {
    label: "Đang chuẩn bị",
    key: 0,
  },
];


const { confirm } = Modal;
const OrderDetails = ({ handleRefresh }) => {
  var product = mockProduct;
  var variant = mockVariant;
  var order = mockOrder;
  var user = mockUser;
  const [status, setStatus] = useState(order.tinhTrangDonHang);
  const [deliveryStatus, setDeliveryStatus] = useState(order.daThanhToan);
  var chiTietDonHangs = null;
  const columns = [
    {
      title: "Tên",
      dataIndex: "",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Phiên bản",
      dataIndex: "",
      key: "age",
      ellipsis: true,
    },
    {
      title: "Giá",
      dataIndex: "address",
      render: (text) => formatCurrency(text),
      align: "right",
      key: "address",
    },
    {
      title: "Số lượng",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Giảm giá",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thành tiền",
      dataIndex: "address",
      key: "address",
    },
  ];
  
  const handleClickStatus = ({key}) => {
    const booleanKey = key === 'true' ? true : key === 'false' ? false : key;
    var label = statusItems.find(item => item.key === booleanKey).label;
    
    booleanKey !== status &&
    confirm({
      title: `Xác nhận thay đổi trạng thái đơn hàng sang "${label}"!`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        setStatus(booleanKey);
      },
        onCancel() {},
      });
  };
  const handleClickDeliveryStatus = ({key}) => {
    var key = Number(key);
    var label = deliveryStatusItems.find(item => item.key === key).label;
    
    key !== deliveryStatus &&
      confirm({
        title: `Xác nhận thay đổi trạng thái đơn hàng sang "${label}"!`,
        icon: <ExclamationCircleFilled />,
        onOk() {
          setDeliveryStatus(key);
          console.log(key);
        },
        onCancel() {},
      });
  };
  const StatusComponent = (props) => {
    return (
      <div>
        {props.status ? (
          <Tag color="success" style={tagStyle}>
            Đã thanh toán
          </Tag>
        ) : (
          <Tag color="processing" style={tagStyle}>
            Chưa thanh toán
          </Tag>
        )}
        <Dropdown
          menu={{ items: statusItems, onClick: handleClickStatus }}
          placement="bottomLeft"
        >
          <Button icon={<EditOutlined />} size="small">
            Thay đổi
          </Button>
        </Dropdown>
      </div>
    );
  };
  const DeliveryStatusComponent = (props) => {
    var tag = null;
    switch (props.deliveryStatus) {
      case 2:
        tag = (
          <Tag color="success" style={tagStyle}>
            Giao thành công
          </Tag>
        );
      case 1:
        tag = (
          <Tag color="processing" style={tagStyle}>
            Đang giao
          </Tag>
        );
      default:
        tag = (
          <Tag color="processing" style={tagStyle}>
            Đang chuẩn bị
          </Tag>
        );
    }
    return (
      <>
        {tag}
        <Dropdown menu={{ items: deliveryStatusItems, onClick: handleClickDeliveryStatus }} placement="bottomLeft" >
          <Button icon={<EditOutlined />} size="small">
            Thay đổi
          </Button>
        </Dropdown>
      </>
    );
  };
  return (
    <>
      <h2>Đơn hàng</h2>
      <div style={{ width: 800, padding: "0 20px 0 20px" }}>
        <Row1 label="Ngày đặt" value={order.ngayDat} />
        <Row1 label="Ngày giao" value={order.ngayGiao} />

        <Row1 label="Người mua" value="" />
        <Row2 label="Tên" value={user.userName} />
        <Row2 label="Id" value="user.id" />
        <Row2 label="Số điện thoại" value={user.phoneNumber} />
        <Row2 label="Địa chỉ" value={user.diaChi} />

        <Row1 label="Sản phẩm" value="" />

        <Table
          dataSource={chiTietDonHangs}
          columns={columns}
          size="small"
          summary={(pageData) => {
            let sum = 0;
            pageData.forEach(({ total }) => {
              sum += total;
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  Tổng tiền hàng:
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">
                  {formatCurrency(sum)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
        <Row1
          label="Tình trạng giao hàng"
          value={<DeliveryStatusComponent deliveryStatus={deliveryStatus} />}
        />
        <Row1 label="Trạng thái" value={<StatusComponent status={status} />} />
      </div>
    </>
  );
};

export default OrderDetails;
