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
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import {
  convertFromMySQLFormat,
  convertToMySQLFormat,
} from "@/app/utils/utils";
import { categoryActions } from "@/app/lib/redux/actions/categories.actions";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

const { Option } = Select;
const { Text, Title } = Typography;

function AdsForm() {
  const [countries, setCountries] = useState([]);
  const loadingCategory = useAppSelector((state) => state.category.loading);
  const loadingAd = useAppSelector((state) => state.ad.loading);
  const categories = useAppSelector((state) => state.category.items);
  const lastFetchedCategoryTime = useAppSelector(
    (state) => state.category.lastFetchedCategoryTime
  );
  const user = useAppSelector((state) => state.user.user);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const t = useTranslations("AdFormPage");

  const pathname = usePathname();
  const isEditPage = pathname.includes("/edit");
  const selectedAd = useAppSelector((state) => state.ad.item);

  const router = useRouter();

  const cb = () => {
    router.push("/my-ads");
  };

  useEffect(() => {
    if (
      isEditPage &&
      selectedAd.user_id === user.id &&
      selectedAd.status_id !== 5 &&
      selectedAd.status_id !== 4
    ) {
      form.setFieldsValue({
        title: selectedAd.title,
        description: selectedAd.description,
        space_available: selectedAd.space_available,
        price: selectedAd.price_kilo,
        departure_country: selectedAd.departure_country,
        arrival_country: selectedAd.arrival_country,
        departure_city: selectedAd.departure_city,
        arrival_city: selectedAd.arrival_city,
        departure_date: convertFromMySQLFormat(selectedAd.departure_date),
        arrival_date: convertFromMySQLFormat(selectedAd.arrival_date),
        user_id: selectedAd.user_id,
        category_id: selectedAd.category_id,
        collection_date: convertFromMySQLFormat(selectedAd.collection_date),
      });
    }

    const currentTime = Date.now();

    if (
      categories.length === 0 ||
      (lastFetchedCategoryTime &&
        currentTime - lastFetchedCategoryTime > 5 * 60 * 1000)
    ) {
      dispatch(categoryActions.getAll());
    }
    setCountries(getNames());
  }, []);

  const [fileList, setFileList] = useState([]);

  const handleFileChange = (info) => {
    const maxSize = 3 * 1024 * 1024;

    const isImage = info.file.type.startsWith("image/");
    if (!isImage) {
      message.error(
        `${info.file.name} is not an image. Please upload an image file.`
      );
      return;
    }

    if (info.file.size > maxSize) {
      message.error(
        `${info.file.name} is too large. Please upload a file smaller than 3 MB.`
      );
      return;
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    setFileList(info.fileList);
  };

  const onFinish = (values) => {
    if (
      isEditPage &&
      selectedAd.user_id === user.id &&
      selectedAd.status_id !== 5 &&
      selectedAd.status_id !== 4
    ) {
      const form = new FormData();
      form.append("title", values.title);
      form.append("description", values.description);
      form.append("space_available", values.space_available);
      form.append("price_kilo", values.price);
      form.append("departure_country", values.departure_country);
      form.append("arrival_country", values.arrival_country);
      form.append("departure_city", values.departure_city);
      form.append("arrival_city", values.arrival_city);
      form.append(
        "departure_date",
        convertToMySQLFormat(values.departure_date)
      );
      form.append("arrival_date", convertToMySQLFormat(values.arrival_date));
      form.append(
        "collection_date",
        convertToMySQLFormat(values.collection_date)
      );
      form.append("user_id", user.id);
      form.append("category_id", values.category_id);
      form.append("photo", fileList.length ? fileList[0].originFileObj : null);

      dispatch(adActions.update(selectedAd.id, form, cb));
    } else {
      const form = new FormData();
      form.append("title", values.title);
      form.append("description", values.description);
      form.append("space_available", values.space_available);
      form.append("price_kilo", values.price);
      form.append("departure_country", values.departure_country);
      form.append("arrival_country", values.arrival_country);
      form.append("departure_city", values.departure_city);
      form.append("arrival_city", values.arrival_city);
      form.append(
        "departure_date",
        convertToMySQLFormat(values.departure_date)
      );
      form.append("arrival_date", convertToMySQLFormat(values.arrival_date));
      form.append(
        "collection_date",
        convertToMySQLFormat(values.collection_date)
      );
      form.append("user_id", user.id);
      form.append("category_id", values.category_id);
      form.append("photo", fileList.length ? fileList[0].originFileObj : null);

      dispatch(adActions.add(form));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
          {t("titleForm")}
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
                  label={<Text strong>{t("title")}</Text>}
                  tooltip={t("titleTooltip")}
                  rules={[
                    { required: true, message: t("titleRequired") },
                    {
                      max: 60,
                      message: t("titleMax"),
                    },
                  ]}
                >
                  <Input size="large" placeholder={t("titleEx")} />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name="description"
                  label={<Text strong>Description</Text>}
                  tooltip={t("descriptionTooltip")}
                  rules={[
                    { required: true, message: t("descriptionRequired") },
                    {
                      max: 200,
                      message: t("descriptionMax"),
                    },
                  ]}
                  style={{ marginBottom: 5 }}
                >
                  <Input.TextArea placeholder={t("descriptionEx")} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="space_available"
                  label={<Text strong>{t("spaceAvailable")}</Text>}
                  tooltip={t("spaceAvailableTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("spaceAvailableRequired"),
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    min={1}
                    style={{ width: "100%" }}
                    placeholder={t("spaceAvailableEx")}
                    addonBefore="Kg"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="price"
                  label={<Text strong>{t("price")}</Text>}
                  tooltip={t("priceTooltipe")}
                  rules={[{ required: true, message: t("priceRequired") }]}
                >
                  <InputNumber
                    size="large"
                    style={{ width: "100%" }}
                    placeholder={t("priceEx")}
                    addonBefore="$"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="departure_country"
                  label={<Text strong>{t("departureCountry")}</Text>}
                  tooltip={t("departureCountryTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("departureCountryRequired"),
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder={t("departureCountryEx")}
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
                  label={<Text strong>{t("arrivalCountry")}</Text>}
                  tooltip={t("arrivalCountryTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("arrivalCountryRequired"),
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder={t("arrivalCountryEx")}
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
                  label={<Text strong>{t("departureCity")}</Text>}
                  tooltip={t("departureCityTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("departureCityRequired"),
                    },
                  ]}
                >
                  <Input size="large" placeholder={t("departureCityEx")} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="arrival_city"
                  label={<Text strong>{t("arrivalCity")}</Text>}
                  tooltip={t("arrivalCityTooltip")}
                  rules={[
                    { required: true, message: t("arrivalCityRequired") },
                  ]}
                >
                  <Input size="large" placeholder={t("arrivalCityEx")} />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="departure_date"
                  label={<Text strong>{t("departureDate")}</Text>}
                  tooltip={t("departureDateTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("departureDateRequired"),
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={(current) =>
                      current && current < moment().startOf("day")
                    }
                    format="YYYY-MM-DD"
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Ex: 15 janvier 2024"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="arrival_date"
                  label={<Text strong>{t("arrivalDate")}</Text>}
                  tooltip={t("arrivalDateTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("arrivalDateRequired"),
                    },
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
                          new Error(t("arrivalDateAfterDepartureDate"))
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
                    placeholder="Ex: 16 janvier 2024"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="collection_date"
                  label={<Text strong>{t("pickUpDate")}</Text>}
                  tooltip={t("collectionDateTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("collectionDate"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const departureDate = getFieldValue("departure_date");
                        const arrivalDate = getFieldValue("arrival_date");
                        if (
                          !value ||
                          !departureDate ||
                          !arrivalDate ||
                          (value.isAfter(departureDate) &&
                            value.isAfter(arrivalDate))
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(t("collectionDateAfterDepartureDate"))
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
                    placeholder="Ex: 18 janvier 2024"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="category_id"
                  label={<Text strong>{t("category")}</Text>}
                  tooltip={t("categoryTooltip")}
                  rules={[
                    {
                      required: true,
                      message: t("categoryRequired"),
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder={t("categoryEx")}
                    options={[
                      ...(categories.length > 0
                        ? categories.map((p) => ({
                            value: p.id,
                            label: p.name,
                          }))
                        : []),
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<Text strong>Photo</Text>}
                  tooltip={t("uploadPhotoItem")}
                >
                  <div style={{ display: "flex" }}>
                    {isEditPage &&
                    selectedAd.user_id === user.id &&
                    selectedAd.photo &&
                    selectedAd.status_id !== 5 &&
                    selectedAd.status_id !== 4 ? (
                      <div style={{ width: 110, height: 100 }}>
                        <Image
                          alt={selectedAd.title}
                          src={
                            selectedAd.photo
                              ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/uploads/images/${selectedAd.photo}`
                              : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/img/valise.png`
                          }
                          width={100}
                          height={100}
                          // layout="fill"
                          // objectFit="cover"
                        />
                      </div>
                    ) : null}
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
                          <div style={{ marginTop: 8 }}>{t("upload")}</div>
                        </div>
                      )}
                    </Upload>
                  </div>
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
                    {t("reset")}
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    icon={<CheckOutlined />}
                  >
                    {t("publishAd")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Card>
    </>
  );
}

export default AdsForm;
