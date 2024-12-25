"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Input,
  Typography,
  Tag,
  Space,
  Form,
  Spin,
  Alert,
  Divider,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { redirect, useRouter } from "next/navigation";
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getStatusTag } from "@/app/utils/utils";

function AdsDetail({ params, rejected }) {
  const ad = useAppSelector((state) => state.ad.item);
  const loading = useAppSelector((state) => state.ad.loading);
  const user = useAppSelector((state) => state.user.user);
  const authenticated = useAppSelector((state) => state.user.authenticated);
  const messageSent = useAppSelector((state) => state.ad.messageSent);
  const t = useTranslations("AdDetailPage");

  const {
    id,
    title,
    description,
    space_available,
    price_kilo,
    departure_country,
    arrival_country,
    departure_city,
    arrival_city,
    departure_date,
    arrival_date,
    collection_date,
    status_id,
    status_name,
    category_name,
    photo,
    author,
    email,
    phone,
    user_id,
  } = ad;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userMessage, setUserMessage] = useState("");

  if (Object.keys(ad).length === 0 && ad.constructor === Object) {
    window.href = "/";
  }

  useEffect(() => {
    if (id && params && params.id != id) {
      redirect("/not-found");
    }
  }, [params, dispatch]);

  const handleSendingMessage = (values) => {
    if (userMessage && user && id) {
      dispatch(adActions.messageAd(user.id, id, values.message));
    }
  };

  return (
    <div style={{ padding: "10px 20px" }}>
      <Card
        bordered={false}
        style={{
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          // paddingBottom: 40,
        }}
      >
        {rejected === true ? (
          <>
            <Typography.Title level={4} style={{ marginTop: "30px" }}>
              {t("reasonForRejection")}
            </Typography.Title>
            <Form
              name="email_rejection"
              initialValues={{
                rejection_reason: "",
              }}
              onFinish={(values) => {
                dispatch(adActions.reject(id, values.rejection_reason));
              }}
              layout="vertical"
            >
              <Form.Item
                style={{ width: "100%" }}
                name="rejection_reason"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: t("messageRequired"),
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder={t("writeYourMessageHere")}
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<MailOutlined />}
                  disabled={!userMessage}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {t("sendMessage")}
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <div
              style={{
                padding: 10,
                height: 400,
                borderRadius: "8px",
                marginBottom: "20px",
                backgroundColor: "#f0f2f5",
                position: "relative",
                width: "100%",
              }}
            >
              <Image
                alt={title}
                src={
                  photo
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/uploads/images/${photo}`
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/img/valise.png`
                }
                layout="fill"
                objectFit="cover"
                style={{
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
            <Typography.Title level={5} style={{ marginTop: "20px" }}>
              {title}
            </Typography.Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24}>
                <Divider style={{ margin: "10px 0px"}} />
              </Col>
            </Row>
            <Typography.Paragraph>{description}</Typography.Paragraph>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24}>
                <Divider style={{ margin: "10px 0px"}} />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <strong>{t("spaceAvailable")}:</strong>{" "}
                {space_available ? `${space_available} Kg` : "N/A"}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("price")}:</strong>{" "}
                {price_kilo ? `$ ${price_kilo}` : "N/A"}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("departureCountry")}:</strong> {departure_country}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("arrivalCountry")}:</strong> {arrival_country}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("departureCity")}:</strong> {departure_city}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("arrivalCity")}:</strong> {arrival_city}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("departureDate")}:</strong> {departure_date}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("arrivalDate")}:</strong> {arrival_date}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("pickUpDate")}:</strong> {collection_date}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("status")}:</strong>{" "}
                {getStatusTag(status_id, status_name)}
              </Col>
              <Col xs={24} sm={12}>
                <strong>{t("category")}:</strong> {category_name}
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24}>
                <Divider style={{ margin: "10px 0px"}} />
              </Col>
            </Row>
            <Typography.Title level={4}>
              {t("advertiserInformation")}
            </Typography.Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <strong>{t("name")}:</strong> {author}
              </Col>
              <Col xs={24} sm={8}>
                <strong>E-mail:</strong> {email}
              </Col>
              <Col xs={24} sm={8}>
                <strong>{t("phone")}:</strong> {phone}
              </Col>
            </Row>
            {params &&
            params.id &&
            user &&
            authenticated &&
            user.isVerified == 1 &&
            user.id !== user_id ? (
              <>
                {messageSent === false ? (
                  <>
                    <Typography.Title level={4} style={{ marginTop: "30px" }}>
                      {t("advertiserInformation")}
                    </Typography.Title>
                    <Form
                      name="email_ad"
                      initialValues={{
                        rejection_reason: "",
                      }}
                      onFinish={handleSendingMessage}
                      layout="vertical"
                    >
                      <Form.Item
                        style={{ width: "100%" }}
                        name="message"
                        validateTrigger="onBlur"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your message",
                          },
                        ]}
                      >
                        <Spin spinning={loading}>
                          <Input.TextArea
                            rows={4}
                            size="large"
                            placeholder="Write your message here..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                          />
                        </Spin>
                      </Form.Item>
                      <Form.Item>
                        <Space>
                          <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            icon={<MailOutlined />}
                            disabled={!userMessage}
                            loading={loading}
                            style={{
                              borderRadius: "8px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            {t("sendMessage")}
                          </Button>
                        </Space>
                      </Form.Item>
                    </Form>
                  </>
                ) : (
                  <>
                    <br />
                    <Alert
                      message="Message sent"
                      type="success"
                      showIcon
                      closable
                    />
                  </>
                )}
              </>
            ) : null}
          </>
        )}
      </Card>
    </div>
  );
}

AdsDetail.defaultProps = {
  params: null,
  rejected: null,
};

export default AdsDetail;
