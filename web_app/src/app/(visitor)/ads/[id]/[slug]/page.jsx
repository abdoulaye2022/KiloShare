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
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { redirect } from "next/navigation";
import { adActions } from "@/app/lib/redux/actions/ads.actions";

function AdsDetail({ params, rejected }) {
  const ad = useAppSelector((state) => state.ad.item);

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
    photo,
    author,
    email,
    phone,
  } = ad;

  const dispatch = useAppDispatch();

  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (params && params.id != id) {
      redirect("/not-found");
    }

    dispatch(adActions.selectedAd(parseInt(id)));
  }, [id, dispatch]);

  const sendMessage = () => {
    setUserMessage("");
    alert("Your message has been sent to the advertiser.");
  };

  const getStatusTag = (statusId, statusName) => {
    switch (statusId) {
      case 1:
        return <Tag color="warning">{statusName}</Tag>;
      case 2:
        return <Tag color="green">{statusName}</Tag>;
      case 3:
        return <Tag color="red">{statusName}</Tag>;
      default:
        return <Tag color="orange">{statusName}</Tag>;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card
        bordered={false}
        style={{
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          paddingBottom: 40,
        }}
      >
        {rejected === true ? (
          <>
            <Typography.Title level={4} style={{ marginTop: "30px" }}>
              Reason for rejection
            </Typography.Title>
            <Form
              name="login"
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
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Write your message here..."
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
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 400,
                borderRadius: "8px",
                marginBottom: "20px",
                backgroundColor: "#f0f2f5",
              }}
            >
              <img
                src={
                  photo
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/uploads/images/${photo}`
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/img/valise.png`
                }
                alt="Ad Photo"
                style={{
                  maxWidth: "100%",
                  height: 400,
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
            <Typography.Title level={2} style={{ marginTop: "20px" }}>
              {title}
            </Typography.Title>
            <Typography.Paragraph>{description}</Typography.Paragraph>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <strong>Space Available:</strong>{" "}
                {space_available ? `${space_available} Kg` : "N/A"}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Price per Kilo:</strong>{" "}
                {price_kilo ? `$ ${price_kilo}` : "N/A"}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Departure Country:</strong> {departure_country}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Arrival Country:</strong> {arrival_country}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Departure City:</strong> {departure_city}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Arrival City:</strong> {arrival_city}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Departure Date:</strong> {departure_date}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Arrival Date:</strong> {arrival_date}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Collection Date:</strong> {collection_date}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Status:</strong> {getStatusTag(status_id, status_name)}
              </Col>
            </Row>

            <Typography.Title level={4} style={{ marginTop: "30px" }}>
              Advertiser Information
            </Typography.Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <strong>Name:</strong> {author}
              </Col>
              <Col xs={24} sm={8}>
                <strong>Email:</strong> {email}
              </Col>
              <Col xs={24} sm={8}>
                <strong>Phone:</strong> {phone}
              </Col>
            </Row>

            {params && params.id ? (
              <>
                <Typography.Title level={4} style={{ marginTop: "30px" }}>
                  Send a Message to the Advertiser
                </Typography.Title>
                <Input.TextArea
                  rows={4}
                  placeholder="Write your message here..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  style={{ marginBottom: "20px" }}
                />
                <Space>
                  <Button
                    type="primary"
                    icon={<MailOutlined />}
                    onClick={sendMessage}
                    disabled={!userMessage}
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Send Message
                  </Button>
                </Space>
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
