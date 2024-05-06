import React, { useState, useEffect } from "react";
import { Button, Input, InputNumber, Form, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import ProductDetails from "./ProductDetails";
import { updateProduct } from "./API";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditProduct = ({ product, setModalChild }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        maHangHoa: product.maHangHoa,
        tenHangHoa: product.tenHangHoa,
        thongTin: product.thongTin,
        gia: product.gia,
        giamGia: product.giamGia,
        soLuongTon: product.soLuongTon,
        image: product.img,
      });
      setFileList(product.img.map((url) => ({ url })));
    }
  }, [product, form]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList, file: newFile }) => {
    if (newFile.response) {
      newFile.url = newFile.response.url;
    }
    setFileList(newFileList);
  };

  const handleRemove = () => {
    // setFileList([]);
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== "image") {
          formData.append(key, values[key]);
        }
      });

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("img", file.originFileObj);
        }
      });

      await updateProduct(formData);

      message.success("Sản phẩm đã được cập nhật thành công");
      setModalChild(null);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div style={{ width: 600 }}>
      <h2 style={{ marginTop: 0 }}>Chỉnh sửa</h2>
      <Form
        form={form}
        name="editProduct"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Mã"
          name="maHangHoa"
          rules={[{ required: true, message: "Hãy nhập mã sản phẩm!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="tenHangHoa"
          rules={[{ required: true, message: "Hãy nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thông tin"
          name="thongTin"
          rules={[{ required: true, message: "Hãy nhập thông tin sản phẩm!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="gia"
          wrapperCol={{ span: 12 }}
          rules={[{ required: true, message: "Hãy nhập giá sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Giảm giá" name="giamGia" wrapperCol={{ span: 12 }}>
          <Input />
        </Form.Item>

        <Form.Item label="Số lượng" name="soLuongTon">
          <InputNumber
            min={0}
            formatter={(value) => `${value}`.replace(/[^0-9]/g, "")}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="image">
          <Upload
            action="http://localhost:8080/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
            beforeUpload={() => false}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        <Form.Item style={{ margin: 0 }} wrapperCol={{ offset: 18, span: 4 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              Lưu
            </Button>
            <Button
              type="default"
              onClick={() =>
                setModalChild(
                  <ProductDetails
                    product={product}
                    setModalChild={setModalChild}
                  />
                )
              }
            >
              Hủy
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
