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
import AllApi from "../../api/api";

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
function formatDate(isoString) {
  // Chuyển đổi chuỗi ISO 8601 thành đối tượng Date
  const date = new Date(isoString);

  // Lấy các thành phần của ngày và giờ theo giờ địa phương
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() trả về giá trị từ 0 đến 11
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Định dạng thành chuỗi theo định dạng DD/MM/YYYY HH:MM:SS
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

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
  "Đang chuẩn bị",
  "Đang giao",
  "Giao thành công",
];

const { confirm } = Modal;
const OrderDetails = ({ order, handleRefresh }) => {
  var product = mockProduct;
  var variant = mockVariant;
  var user = order.user;
  const [status, setStatus] = useState(order.daThanhToan);
  const [deliveryStatus, setDeliveryStatus] = useState(order.tinhTrangDonHang);
  var chiTietDonHangs = order.chiTietDonHangs;
  const columns = [
    {
      title: "Tên",
      dataIndex: ["variant", "hangHoa", "tenHangHoa"],
      key: "name",
      width: "200px",
    },
    {
      title: "Phiên bản",
      dataIndex: ["variant", "color"],
      key: "age",
      width: 80,
    },
    {
      title: "Giá",
      dataIndex: "",
      key: "price",
      render: (record) => formatCurrency(record.total / (1 - record.giamGia)),
      align: "right",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },
    {
      title: "Giảm giá",
      dataIndex: ["variant", "sale"],
      key: "giamGia",
      align: "right",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text, record) => formatCurrency(text),
      align: "right",
    },
  ];

  const handleClickDeliveryStatus = () => {
    if (deliveryStatus === 2) message.info("Đơn hàng đã được giao");
    else {
      confirm({
        title: `Xác nhận thay đổi trạng thái đơn hàng sang "${deliveryStatusItems[deliveryStatus+1]}"!`,
        icon: <ExclamationCircleFilled />,
        async onOk() {
          try {
            const response = await AllApi.updateOrderStatus(order.maDonHang);
            const newDeliveryStatus = deliveryStatus + 1;
            setDeliveryStatus(newDeliveryStatus);
            if (newDeliveryStatus === 2) {
              setStatus(true);
            }
            handleRefresh();
          } catch (error) {
            console.log(error);
          }
        },
        onCancel() {},
      });
    }
  };
  const StatusComponent = (props) => {
    return (
      <div>
        {props.status ? (
          <Tag bordered={false} color="success" style={tagStyle}>
            Đã thanh toán
          </Tag>
        ) : (
          <Tag bordered={false} color="processing" style={tagStyle}>
            Chưa thanh toán
          </Tag>
        )}
      </div>
    );
  };
  const DeliveryStatusComponent = (props) => {
    var tag = null;
    switch (props.deliveryStatus) {
      case 2:
        tag = (
          <Tag bordered={false} color="success" style={tagStyle}>
            Giao thành công
          </Tag>
        );
        break;
      case 1:
        tag = (
          <Tag bordered={false} color="processing" style={tagStyle}>
            Đang giao
          </Tag>
        );
        break;
      case 0:
        tag = (
          <Tag bordered={false} color="processing" style={tagStyle}>
            Đang chuẩn bị
          </Tag>
        );
        break;
      default:
        tag = (
          <Tag bordered={false} color="processing" style={tagStyle}>
            Đơn hàng đã bị hủy
          </Tag>
        );
    }
    return tag;
  };
  return (
    <>
      <h2>Đơn hàng</h2>
      <div style={{ width: 800, padding: "0 20px 0 20px" }}>
        <Row1 label="Mã" value={order.maDonHang} />
        <Row1 label="Ngày đặt" value={formatDate(order.ngayDat)} />
        <Row1
          label="Ngày giao"
          value={order.ngayGiao ? formatDate(order.ngayGiao) : "Chưa xác định"}
        />

        <Row1 label="Người mua" value="" />
        <Row2 label="Tên" value={user.userName} />
        <Row2 label="Id" value={user.id} />
        <Row2 label="Số điện thoại" value={user.phoneNumber} />
        <Row2 label="Địa chỉ" value={user.diaChi} />

        <Row1 label="Sản phẩm" value="" />

        <Table
          dataSource={chiTietDonHangs}
          columns={columns}
          size="small"
          pagination={false}
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
                <Table.Summary.Cell index={4} align="right">
                  Tổng tiền hàng:
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">
                  {formatCurrency(sum)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
        <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
          <Col span={6} style={{ fontSize: 16, fontWeight: "bold" }}>
            Tình trạng giao hàng:
          </Col>
          <Col span={16} style={{ fontSize: 18 }}>
            <DeliveryStatusComponent deliveryStatus={deliveryStatus} />
            <Button
              icon={<EditOutlined />}
              onClick={handleClickDeliveryStatus}
              style={{ width: "fit-content" }}
            >
              Thay đổi
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
          <Col span={6} style={{ fontSize: 16, fontWeight: "bold" }}>
            Trạng thái:
          </Col>
          <Col span={16} style={{ fontSize: 18 }}>
            <StatusComponent status={status} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetails;
