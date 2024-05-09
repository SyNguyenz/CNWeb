import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Row,
  Col,
  Divider,
  message,
  Upload,
  Image,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { addProduct } from "./API";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProduct = ({ setModalChild }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [variants, setVariants] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    console.log(variants);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { key: Date.now(), color: "", quantity: "", sale: "", image: [] },
    ]);
  };

  const removeVariant = (key) => {
    setVariants(variants.filter((variant) => variant.key !== key));
  };

  const handleVariantChange = (key, field, value) => {
    setVariants(
      variants.map((variant) =>
        variant.key === key ? { ...variant, [field]: value } : variant
      )
    );
  };

  const handleVariantImageChange = (
    key,
    { fileList: newFileList, file: newFile }
  ) => {
    setVariants(
      variants.map((variant) =>
        variant.key === key ? { ...variant, image: newFileList } : variant
      )
    );
  };
  const handleVariantImageRemove = (key, file) => {
    setVariants(
      variants.map((variant) =>
        variant.key === key ? { ...variant, image: [] } : variant
      )
    );
  };

  const onFinish = async (values) => {
    try {
        const formData = new FormData();
      
      const data = {
        maHangHoa: values.maHangHoa,
        tenHangHoa: values.tenHangHoa,
        loaiHangHoa: values.loaiHangHoa,
        hangSanXuat: values.hangSanXuat,
        thongTin: values.thongTin,
        thongSo: values.thongSo,
        gia: values.gia,
        variants: [],
      };
      var images = [];
      // Lặp qua mảng variants và thêm dữ liệu của mỗi phần tử vào mảng variants của đối tượng data
      variants.forEach((variant, index) => {
        console.log(variant.image[0]);
        console.log(variant.image[0].url);
        if (variant.image[0].url) {
          data.variants.push({
            color: variant.color,
            quantity: variant.quantity,
            sale: variant.sale,
            image: variant.image[0].url,
          });
        } else {
          data.variants.push({
            color: variant.color,
            quantity: variant.quantity,
            sale: variant.sale,
            image: null,
          });
          images.push(variant.image[0].originFileObj);
        }
      });
      for (var i =0; i< images.length; i++) {
        formData.append('images', images[i]);
      }
      var jsonObject = JSON.stringify(data);
      formData.append('jsonObject', jsonObject);

      await addProduct(formData);
      message.success("Sản phẩm được cập nhật thành công!");
      setModalChild(null);
    } catch (e) {
      message.error(e.message);
    }
  };

  const uploadButton = (
    <Button icon={<PlusOutlined />} style={{ border: 0, background: "none" }} />
  );

  return (
    <div style={{ width: 1200 }}>
      <h2 style={{ marginTop: 0 }}>Thêm Sản Phẩm</h2>
      <Form
        name="themSanPham"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã"
              name="maHangHoa"
              rules={[{ required: true, message: "Hãy nhập mã sản phẩm!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="tenHangHoa"
              rules={[{ required: true, message: "Hãy nhập tên sản phẩm!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Loại"
              name="loaiHangHoa"
              rules={[{ required: true, message: "Hãy nhập loại hàng hóa!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nhà sản xuất"
              name="hangSanXuat"
              rules={[{ required: true, message: "Hãy nhập tên hãng sản xuất!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Thông tin"
              name="thongTin"
              rules={[
                { required: true, message: "Hãy nhập thông tin sản phẩm!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Thông số"
              name="thongSo"
              rules={[
                { required: true, message: "Hãy nhập thông số sản phẩm!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="gia"
              wrapperCol={{ span: 12 }}
              rules={[{ required: true, message: "Hãy nhập giá sản phẩm!" }]}
            >
              <InputNumber
                min={0}
                addonAfter="₫"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: 10 }}>
            <h3 style={{ margin: 0 }}>Biến thể</h3>
            {variants.map((variant) => (
              <div key={variant.key} style={{ marginBottom: 8 }}>
                <Divider style={{ margin: 10 }} />
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Màu sắc"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      rules={[{ required: true, message: "Hãy nhập màu sắc!" }]}
                    >
                      <Input
                        placeholder="Màu sắc"
                        value={variant.color}
                        onChange={(e) =>
                          handleVariantChange(
                            variant.key,
                            "color",
                            e.target.value
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label="Số lượng"
                      labelCol={{ span: 8 }}
                      rules={[
                        { required: true, message: "Hãy nhập số lượng!" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        value={variant.quantity}
                        onChange={(value) =>
                          handleVariantChange(variant.key, "quantity", value)
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label="Giảm giá"
                      labelCol={{ span: 8 }}
                      style={{ marginBottom: 0 }}
                    >
                      <InputNumber
                        min={0}
                        addonAfter="%"
                        value={variant.sale}
                        onChange={(value) =>
                          handleVariantChange(variant.key, "sale", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item label="Hình ảnh" labelCol={{ span: 8 }}>
                      <Upload
                        listType="picture-card"
                        fileList={variant.image}
                        onPreview={handlePreview}
                        onChange={(info) =>
                          handleVariantImageChange(variant.key, info)
                        }
                        onRemove={(file) =>
                          handleVariantImageRemove(variant.key, file)
                        }
                        beforeUpload={() => false}
                        maxCount={1}
                      >
                        {!variant.image.length ? uploadButton : null}
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col
                    span={2}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button
                      type="dashed"
                      onClick={() => removeVariant(variant.key)}
                      icon={<MinusCircleOutlined />}
                    />
                  </Col>
                </Row>
              </div>
            ))}

            <Button
              type="dashed"
              onClick={addVariant}
              icon={<PlusOutlined />}
              style={{ width: "100%", marginBottom: 20 }}
            >
              Thêm biến thể
            </Button>
          </Col>
        </Row>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
            }}
            src={previewImage}
          />
        )}
        <Form.Item
          wrapperCol={{
            offset: 21,
            span: 3,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
            <Button type="default" onClick={() => setModalChild(null)}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
