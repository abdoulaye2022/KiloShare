import React, { useEffect, useState } from "react";
import {
  CheckOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  message,
  Upload,
  Spin,
  Divider,
  Card,
} from "antd";
import { getNames } from "country-list";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { adActions } from "@/app/lib/redux/actions/ads.actions";

dayjs.extend(utc);

const { Option } = Select;
const { Text, Title } = Typography;

function AdsForm() {
  const [countries, setCountries] = useState([]);
  const loadingCategory = useAppSelector((state) => state.category.loading);
  const loadingAd = useAppSelector((state) => state.ad.loading);
  const categories = useAppSelector((state) => state.category.items);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCountries(getNames());
  }, []);

  const [fileList, setFileList] = useState([]);

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);
  };

  const convertToMySQLFormat = (dateStr) => {
    const formattedDate = dayjs.utc(dateStr).local().format("YYYY-MM-DD");
    return formattedDate;
  };

  const onFinish = (values) => {
    const form = new FormData();
    form.append("title", values.title);
    form.append("description", values.description);
    form.append("space_available", values.space_available);
    form.append("price_kilo", values.price);
    form.append("departure_country", values.departure_country);
    form.append("arrival_country", values.arrival_country);
    form.append("departure_city", values.departure_city);
    form.append("arrival_city", values.arrival_city);
    form.append("departure_date", convertToMySQLFormat(values.departure_date));
    form.append("arrival_date", convertToMySQLFormat(values.arrival_date));
    form.append(
      "collection_date",
      convertToMySQLFormat(values.collection_date)
    );
    form.append("user_id", 1);
    form.append("category_id", values.category_id);
    form.append("photo", fileList[0].originFileObj);

    dispatch(adActions.add(form));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card
      className="form-card"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: 30, color: "#1890ff" }}
      >
        Create New Ad
      </Title>
      <Spin spinning={loadingCategory || loadingAd}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            title: "",
            description: "",
          }}
          form={form}
          className="custom-form"
        >
          <Row gutter={[24, 16]}>
            <Col xs={24}>
              <Form.Item
                name="title"
                label={<Text strong>Title</Text>}
                rules={[{ required: true, message: "Please enter a title." }]}
              >
                <Input size="large" placeholder="Enter ad title" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="description"
                label={<Text strong>Description</Text>}
                rules={[
                  { required: true, message: "Please enter a description." },
                ]}
                style={{ marginBottom: 5 }}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="space_available"
                label={<Text strong>Space Available (KG)</Text>}
                rules={[
                  {
                    required: true,
                    message: "Please enter the available space.",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Enter available space"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="price"
                label={<Text strong>Price</Text>}
                rules={[{ required: true, message: "Please enter the price." }]}
              >
                <InputNumber
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Enter price per kg"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="departure_country"
                label={<Text strong>Departure Country</Text>}
                rules={[
                  {
                    required: true,
                    message: "Please select a departure country.",
                  },
                ]}
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Select departure country"
                  options={countries.map((country) => ({
                    value: country,
                    label: country,
                  }))}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="arrival_country"
                label={<Text strong>Arrival Country</Text>}
                rules={[
                  {
                    required: true,
                    message: "Please select an arrival country",
                  },
                ]}
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Select arrival country"
                  options={countries.map((country) => ({
                    value: country,
                    label: country,
                  }))}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="departure_city"
                label={<Text strong>Departure City</Text>}
                rules={[
                  { required: true, message: "Please enter a departure city" },
                ]}
              >
                <Input size="large" placeholder="Enter departure city" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="arrival_city"
                label={<Text strong>Arrival City</Text>}
                rules={[
                  { required: true, message: "Please enter an arrival city" },
                ]}
              >
                <Input size="large" placeholder="Enter arrival city" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="departure_date"
                label={<Text strong>Departure Date</Text>}
                rules={[
                  { required: true, message: "Please select a departure date" },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                  format="YYYY-MM-DD"
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select departure date"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="arrival_date"
                label={<Text strong>Arrival Date</Text>}
                rules={[
                  { required: true, message: "Please select an arrival date" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const departureDate = getFieldValue("departure_date");
                      if (
                        !value ||
                        !departureDate ||
                        value.isAfter(departureDate)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Arrival date must be after departure date")
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                  format="YYYY-MM-DD"
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select arrival date"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="collection_date"
                label={<Text strong>Collection Date</Text>}
                rules={[
                  {
                    required: true,
                    message: "Please select a collection date",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const departureDate = getFieldValue("departure_date");
                      const arrivalDate = getFieldValue("arrival_date");
                      if (
                        !value ||
                        !departureDate ||
                        value.isAfter(departureDate) ||
                        !arrivalDate ||
                        value.isAfter(arrivalDate)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Collection date must be after departure and arrival date"
                        )
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                  format="YYYY-MM-DD"
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select collection date"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="category_id"
                label={<Text strong>Category</Text>}
                rules={[
                  {
                    required: true,
                    message: "Please select a category",
                  },
                ]}
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Select category"
                  options={
                    categories
                      ? categories.map((p) => ({
                          value: p.id,
                          label: p.name,
                        }))
                      : null
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={<Text strong>Photo</Text>}
                required
                tooltip="Upload a photo of your item"
              >
                <Upload
                  name="file"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  maxCount={1}
                  accept="image/*"
                >
                  {fileList.length < 1 && (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>

            <Col span={24} style={{ textAlign: "right" }}>
              <Form.Item>
                <Button
                  size="large"
                  style={{ marginRight: 16 }}
                  htmlType="reset"
                  icon={<ReloadOutlined />}
                >
                  Reset
                </Button>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  icon={<CheckOutlined />}
                >
                  Publish Ad
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Card>
  );
}

export default AdsForm;
