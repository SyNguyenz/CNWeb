import React, { useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Image,
  Radio,
  Rate,
  Row,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditProduct from "./EditProduct";
const { Paragraph } = Typography;

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
const getSoLuong = (product) => {
  return product.variants.reduce(
    (total, variant) => total + variant.quantity,
    0
  );
};

const ProductDetails = ({ product, setModalChild }) => {
  var options = product.variants.map((variant) => ({
    label: variant.color,
    value: variant,
  }));
  console.log(options);
  const [variant, setVariant] = useState(options[0].value || null);

  const onChange = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setVariant(value);
  };

  return (
    <div style={{ width: 1000 }}>
      <Row gutter={16}>
        <Col flex="0 1 400px">
          <Image
            src={variant.image}
            height={400}
            width={400}
            style={{ marginBottom: "20px", objectFit: "contain" }}
          />
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
                {product.star1 +
                  product.star2 +
                  product.star3 +
                  product.star4 +
                  product.star5}
              </span>
              <span>Đánh giá</span>
            </Col>
          </Row>

          <CustomRow label="Mã hàng hóa" value={product.maHangHoa} />
          <CustomRow label="Loại hàng hóa" value={product.loaiHangHoa} />
          <CustomRow label="Hãng sản xuất" value={product.hangSanXuat} />
          <CustomRow label="Tổng số lượng" value={getSoLuong(product)} />
          <CustomRow
            label="Màu"
            value={
              <Radio.Group
                options={options}
                onChange={onChange}
                value={variant}
                optionType="button"
              />
            }
          />

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
              ₫ {formatPrice(product.gia * (1 - variant.sale / 100))}
            </Col>
          </Row>
          <CustomRow label="Giảm giá" value={`${variant.sale}%`} />
          <CustomRow label="Số lượng" value={variant.quantity} />

          <div style={{ fontSize: 18, marginTop: 10 }}>Thông tin: </div>
          <Paragraph
            style={{
              maxHeight: 275,
              overflowY: "auto",
              whiteSpace: "pre-line",
              marginLeft: 10,
            }}
          >
            {product.thongTin}
          </Paragraph>

          <div style={{ fontSize: 18, marginTop: 10 }}>Thông số: </div>
          <Paragraph
            style={{
              maxHeight: 275,
              overflowY: "auto",
              whiteSpace: "pre-line",
              marginLeft: 10,
            }}
          >
            {product.thongSo
              .split(",")
              .map((item) => item.trim())
              .join("\n")}
          </Paragraph>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            console.log("gg");
            setModalChild(
              <EditProduct product={product} setModalChild={setModalChild} />
            );
          }}
        >
          Chỉnh sửa
        </Button>
      </Row>
    </div>
  );
};

export default ProductDetails;
