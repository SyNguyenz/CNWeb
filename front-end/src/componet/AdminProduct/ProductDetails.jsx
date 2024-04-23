import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  ConfigProvider,
  Image,
  Rate,
  Row,
  Space,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;

const images = [
  "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmd1u9d70au72d",
  "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmd1u9d71pen39",
  "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmd1u9d733z3dd",
  "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmd1u9d74ijjfb",
  "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmd1u9d75x3z16",
  "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmd2lk76ilzz7c",
];
const CustomRow = ({ label, value }) => (
  <Row gutter={[16, 16]}>
    <Col span={8} style={{ fontSize: 16, color: "#929292" }}>
      {label}:
    </Col>
    <Col span={16} style={{ fontSize: 18 }}>
      {value}
    </Col>
  </Row>
);
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  return (
    <div style={{ width: 1000, }}>
      {/* <h2 style={{ marginTop: 0 }}>Chi tiết sản phẩm</h2> */}
      <Row gutter={16}>
        <Col flex="0 0 400px">
          <Row justify="start">
            {selectedImage && (
              <Image
                src={selectedImage}
                height={400}
                width={400}
                style={{ marginBottom: "20px", objectFit: "contain" }}
              />
            )}
          </Row>
          <Row justify="start" style={{ marginTop: 5 }}>
            <div style={{ overflowX: "auto", width: 400 }}>
              <Space size={10}>
                {images.map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    width={80}
                    height={80}
                    preview={false}
                    style={{
                      objectFit: "cover",
                      border:
                        selectedImage === imageUrl
                          ? "2px solid #d0011b"
                          : "none",
                    }}
                    onMouseEnter={() => setSelectedImage(imageUrl)}
                  />
                ))}
              </Space>
            </div>
          </Row>
        </Col>
        <Col flex="1 0 400px">
          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: "24px",
              overflowWrap: "break-word",
            }}
          >
            {product.tenHangHoa}
          </span>

          <Row gutter={[16, 16]} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <span
                style={{
                  color: "#d0011b",
                  borderBottom: "1px solid #d0011b",
                  fontSize: 16,
                }}
              >
                {product.rating}
              </span>
              <ConfigProvider
                theme={{
                  token: {
                    marginXS: 0,
                  },
                }}
              >
                <Rate
                  allowHalf
                  defaultValue={product.rating}
                  disabled
                  style={{ fontSize: 14, marginLeft: 5, color: "#d0011b" }}
                />
              </ConfigProvider>
            </Col>
            <Col
              span={8}
              style={{
                borderLeft: "1px solid #dbdbdb",
                borderRight: "1px solid #dbdbdb",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  borderBottom: "1px solid #555",
                  marginRight: 5,
                }}
              >
                123
              </span>
              <span>Đánh giá</span>
            </Col>
          </Row>

          <CustomRow label="Mã hàng hóa" value={product.maHangHoa} />
          <Row gutter={[16, 16]}>
            <Col span={8} style={{ fontSize: 16, color: "#929292" }}>
              Giá gốc:
            </Col>
            <Col
              span={16}
              style={{
                fontSize: 18,
                color: "#d0011b",
                textDecoration: "line-through",
              }}
            >
              ₫ {formatPrice(product.gia)}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8} style={{ fontSize: 16, color: "#929292" }}>
              Giá hiện tại:
            </Col>
            <Col span={16} style={{ fontSize: 18, color: "#d0011b" }}>
              ₫ {formatPrice(product.gia * (1 - product.giamGia / 100))}
            </Col>
          </Row>
          <CustomRow label="Giảm giá" value={`${product.giamGia}%`} />
          <CustomRow label="Số lượng tồn" value={product.soLuongTon} />

          <div style={{ fontSize: 18, marginTop: 10 }}>Mô tả sản phẩm:</div>
          <Paragraph
            style={{
              maxHeight: 275,
              overflowY: "auto",
              whiteSpace: "pre-line",
              marginLeft: 10,
            }}
          ></Paragraph>
        </Col>
      </Row>
      <Row justify="end">
        <Button type="primary" icon={<EditOutlined />}>
          Chỉnh sửa
        </Button>
      </Row>
    </div>
  );
};

export default ProductDetails;
