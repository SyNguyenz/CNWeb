import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddProduct = ({ onClose }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList);
  };
  const handleRemove = () => {};
  const onFinish = (values) => {
    console.log("Success:", values);
    onClose();
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
    <div style={{width: 600,}}>
      <h2 style={{marginTop: 0,}}>Thêm Sản Phẩm</h2>
      <Form
        preserve={false}
        name="themSanPham"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Mã"
          name="maHangHoa"
          rules={[
            {
              required: true,
              message: "Hãy nhập mã sản phẩm!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="tenHangHoa"
          rules={[
            {
              required: true,
              message: "Hãy nhập tên sản phẩm!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thông tin"
          name="thongTin"
          rules={[
            {
              required: true,
              message: "Hãy nhập thông tin sản phẩm!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="gia"
          wrapperCol={{ span: 12 }}
          rules={[
            {
              required: true,
              message: "Hãy nhập giá sản phẩm!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Giảm giá" name="giamGia" wrapperCol={{ span: 12 }}>
          <Input />
        </Form.Item>

        <Form.Item label="Số lượng" name="soLuongTon">
          <InputNumber
            min={0}
            formatter={(value) => `${value}`.replace(/[^0-9]/g, "")} // Loại bỏ các ký tự không phải số
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

        <Form.Item
          style={{
            margin: 0,
          }}
          wrapperCol={{
            offset: 18,
            span: 4,
          }}
        >
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              OK
            </Button>
            <Button type="default" onClick={onClose}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddProduct;
