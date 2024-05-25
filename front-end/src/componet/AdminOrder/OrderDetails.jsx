import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Dropdown, Row, Tag } from "antd";
import React, { useState } from "react";

const tagStyle = {
    height: '38px',
    lineHeight: '38px', 
    fontSize: '16px' 
  };

const Row2 = ({ label, value }) => (
  <Row gutter={[16, 16]}>
    <Col span={1}></Col>
    <Col span={4} style={{ fontSize: 16, color: "#929292" }}>
      {label}:
    </Col>
    <Col span={16} style={{ fontSize: 18}}>
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
        label: 'Đã thanh toán',
        key: '1',
    },
    {
        label: 'Chưa thanh toán',
        key: '2',
    }
];
const statusDeliveryItems = [
    {
        label: 'Giao thành công',
        key: '2',

    },
    {
        label: 'Đang giao',
        key: '1',
    }, 
    {
        label: 'ĐAng chuẩn bị',
        key: '0',
    }
];


const StatusComponent = ({ status }) => {
    return (
      <div>
        {status ? (
          <Tag color="success" style={tagStyle}>Đã thanh toán</Tag>
        ) : (
          <Tag color="processing" style={tagStyle}>Chưa thanh toán</Tag>
        )}
        <Dropdown menu={{ items: statusItems }} placement="bottomLeft">
          <Button icon={<EditOutlined />}>Thay đổi</Button>
        </Dropdown>
      </div>
    );
  };
const DeliveryStatusComponent = ({deliveryStatus}) => {
    switch (deliveryStatus) {
        case 2:
          return (
            <Tag color="success" style={tagStyle}>Giao thành công</Tag>
          );
        case 1:
          return (
            <Tag color="processing" style={tagStyle}>Đang giao</Tag>
          );
        default:
          return (
            <Tag color="error" style={tagStyle}>Đang chuẩn bị</Tag>
          );
      }
}

const OrderDetails = () => {
  const [status, setStatus] = useState(false); // Bạn có thể thay đổi giá trị ban đầu cho trạng thái đơn hàng
  const [deliveryStatus, setDeliveryStatus] = useState(false); // Tương tự cho trạng thái giao hàng

  return (
    <>
      <h2>Đơn hàng</h2>
      <div style={{ width: 800, padding: "0 20px 0 20px" }}>
        <Row1 label="Ngày đặt" value="none-data" />
        <Row1 label="Ngày giao" value="ngngn" />

        <Row1 label="Người mua" value="" />
        <Row2 label="Tên" value="none-data" />
        <Row2 label="Id" value="none-data" />
        <Row2 label="Số điện thoại" value="none-data" />
        <Row2 label="Địa chỉ" value="none-data" />

        <Row1 label="Sản phẩm" value="" />
        <Row2 label="Tên" value="none-data" />
        <Row2 label="Id" value="none-data" />
        <Row2 label="Giá" value="none-data" />
        <Row2 label="Số lượng" value="none-data" />
        <Row2 label="Giảm giá" value="none-data" />

        <Divider style={{ margin: "10px 0 10px 0", borderBlockColor: "red" }} />
        <Row1 label="Thành tiền" value="none-data" />
        <Row1 label="Tình trạng giao hàng" value={<DeliveryStatusComponent deliveryStatus={deliveryStatus} />} />
        <Row1 label="Trạng thái" value={<StatusComponent status={status} />} />
      </div>
    </>
  );
};

export default OrderDetails;
