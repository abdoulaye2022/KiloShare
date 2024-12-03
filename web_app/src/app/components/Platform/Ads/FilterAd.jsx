import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Input,
  Select,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Form,
} from "antd";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { getNames } from "country-list";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import { convertToMySQLFormat } from "@/app/utils/utils";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

function FilterAd() {
  const [countries, setCountries] = useState([]);
  const [form] = Form.useForm();
  const categories = useAppSelector((state) => state.category.items);
  const isFiltered = useAppSelector((state) => state.ad.isFiltered);
  const dispatch = useAppDispatch();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMobileChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMobileChange);

    handleMobileChange(mediaQuery);

    setCountries(getNames());

    return () => {
      mediaQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  const onFinish = (values) => {
    dispatch(
      adActions.filteredAds({
        departure_date: values.departure_date
          ? convertToMySQLFormat(values.departure_date)
          : "",
        arrival_date: values.arrival_date
          ? convertToMySQLFormat(values.arrival_date)
          : "",
        departure_country: values.departure_country,
        arrival_country: values.arrival_country,
        category_id: values.category_id,
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4}>Filter Ads</Title>
        </Col>
      </Row>
      <Form
        style={{
          height: isMobile ? null : 40,
        }}
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
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="departure_date">
              <DatePicker
                format="YYYY-MM-DD"
                size="large"
                style={{ width: "100%" }}
                placeholder="Departure Date"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="arrival_date">
              <DatePicker
                format="YYYY-MM-DD"
                size="large"
                style={{ width: "100%" }}
                placeholder="Arrival Date"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="departure_country">
              <Select
                showSearch
                size="large"
                placeholder="Select departure country"
                options={[
                  { value: "", label: "All Countries" },
                  ...countries.map((country) => ({
                    value: country,
                    label: country,
                  })),
                ]}
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="arrival_country">
              <Select
                showSearch
                size="large"
                placeholder="Select arrival country"
                options={[
                  { value: "", label: "All Countries" },
                  ...countries.map((country) => ({
                    value: country,
                    label: country,
                  })),
                ]}
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="category_id">
              <Select
                showSearch
                size="large"
                placeholder="Select category"
                options={[
                  { value: "", label: "All Categories" },
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
          <Col xs={24} sm={12} lg={1} style={{ display: "flex" }}>
            <Button
              type="primary"
              size="large"
              shape="circle"
              htmlType="submit"
              icon={<SearchOutlined />}
            />
            {isFiltered ? (
              <Button
                type="dashed"
                size="large"
                shape="circle"
                htmlType="submit"
                onClick={() => dispatch(adActions.resetFilter())}
                style={{ marginLeft: 10 }}
                icon={<RedoOutlined />}
              />
            ) : null}
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FilterAd;
