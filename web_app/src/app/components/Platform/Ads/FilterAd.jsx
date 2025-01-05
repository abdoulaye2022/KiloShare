import React, { useEffect, useState } from "react";
import { DatePicker, Select, Button, Row, Col, Typography, Form } from "antd";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { getNames } from "country-list";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import { convertToMySQLFormat } from "@/app/utils/utils";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const { Title } = Typography;

function FilterAd() {
  const [countries, setCountries] = useState([]);
  const [form] = Form.useForm();
  const categories = useAppSelector((state) => state.category.items);
  const isFiltered = useAppSelector((state) => state.ad.isFiltered);
  const t = useTranslations("FilterAdsPage");
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const status = useAppSelector(state => state.status.items);

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
    if(pathname === "/my-ads") {
      dispatch(
        adActions.filteredMyAds({
          departure_date: values.departure_date
            ? convertToMySQLFormat(values.departure_date)
            : "",
          arrival_date: values.arrival_date
            ? convertToMySQLFormat(values.arrival_date)
            : "",
          departure_country: values.departure_country,
          arrival_country: values.arrival_country,
          category_id: values.category_id,
          status_id: values.status_id ? values.status_id : ""
        })
      );
    } else {
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
          status_id: values.status_id ? values.status_id : ""
        })
      );
    }
    dispatch(modalActions.closeMobileFilterAds());
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4}>{t("title")}</Title>
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
          departure_country: "",
          arrival_country: "",
          departure_date: "",
          arrival_date: "",
          category_id: "",
          category_id: "",
          status_id: ""
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
                placeholder={t("departureDate")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="arrival_date">
              <DatePicker
                format="YYYY-MM-DD"
                size="large"
                style={{ width: "100%" }}
                placeholder={t("arrivalDate")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="departure_country">
              <Select
                showSearch
                size="large"
                placeholder={t("departureCountry")}
                options={[
                  { value: "", label: t("allCountries") },
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
                placeholder={t("arrivalcountry")}
                options={[
                  { value: "", label: t("allCountries") },
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
                placeholder={t("category")}
                options={[
                  { value: "", label: t("allCategories") },
                  ...(categories.length > 0
                    ? categories.map((p) => ({
                        value: p.id,
                        label: t(p.name),
                      }))
                    : []),
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={4} style={{ display: "flex" }}>
            {pathname === "/my-ads" ? (
              <>
                <Form.Item name="status_id">
                  <Select
                    showSearch
                    size="large"
                    placeholder={t("status")}
                    style={{ width: 150 }}
                    options={[
                      { value: "", label: t("allStatus") },
                      ...(status.length > 0
                        ? status.map((p) => ({
                            value: p.id,
                            label: t(p.name),
                          }))
                        : []),
                    ]}
                  />
                </Form.Item>
                &nbsp;&nbsp;&nbsp;
              </>
            ) : null}
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
                onClick={() => {
                  dispatch(adActions.resetFilter());
                  dispatch(modalActions.closeMobileFilterAds());
                  form.resetFields();
                }}
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
