"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Divider,
  Alert,
  Spin,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { contactActions } from "@/app/lib/redux/actions/contacts.actions";
import ReCAPTCHA from "react-google-recaptcha";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const t = useTranslations("ContactUsPage");
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.contact.loading);
  const success = useAppSelector((state) => state.contact.success);
  const [form] = Form.useForm();
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const onFinish = (values) => {
    if (!captchaValue) {
      message.error("Veuillez valider le reCAPTCHA.");
      return;
    }

    dispatch(
      contactActions.sendContact(
        values.name,
        values.email,
        values.subject,
        values.message,
        captchaValue
      )
    );
    form.resetFields();
  };

  useEffect(() => {
    dispatch(contactActions.resetSuccess());
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={24} lg={24} xl={24}>
          <Card>
            <Title
              level={2}
              style={{
                textAlign: "center",
                marginBottom: "24px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {t("title")}
            </Title>

            <Paragraph
              style={{
                fontSize: "16px",
                textAlign: "justify",
                lineHeight: "1.8",
                textAlign: "center",
              }}
            >
              {t("description")}
            </Paragraph>

            <Divider />

            <Row gutter={[24, 24]}>
              {/* Formulaire de contact */}
              <Col xs={24} md={12} style={{ padding: "0px 20px" }}>
                {success ? (
                  <Alert message={t("messageSent")} type="success" />
                ) : null}
                <Spin spinning={loading} style={{ width: "100%" }} />
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="name"
                    label={t("name")}
                    rules={[{ required: true, message: t("nameRequired") }]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        required: true,
                        message: t("emailRequired"),
                      },
                      {
                        type: "email",
                        message: t("emailInvalid"),
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item
                    name="subject"
                    label={t("subject")}
                    rules={[{ required: true, message: t("subjectRequired") }]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                      {
                        required: true,
                        message: t("messageRequired"),
                      },
                    ]}
                  >
                    <TextArea rows={6} size="large" />
                  </Form.Item>

                  <Form.Item>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA}
                    onChange={handleCaptchaChange}
                  />
                </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                      {t("sendMessage")}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>

              <Col xs={24} md={12}>
                <Title
                  level={3}
                  style={{
                    marginTop: "24px",
                    paddingBottom: "8px",
                  }}
                >
                  {t("contactInformation")}
                </Title>
                <Paragraph>
                  <MailOutlined /> E-mail :{" "}
                  <a href="mailto:contact@kilo-share.com">
                    contact@kilo-share.com
                  </a>
                </Paragraph>
                {/* <Paragraph>
                  <PhoneOutlined /> Téléphone : +33 1 23 45 67 89
                </Paragraph> */}
                {/* <Paragraph>
                  <EnvironmentOutlined /> Adresse : 245 Rue Lorette, Dieppe, E1A 8M4 CANADA
                </Paragraph> */}
                <Title
                  level={3}
                  style={{
                    marginTop: "24px",
                    paddingBottom: "8px",
                  }}
                >
                  {t("availability")}
                </Title>
                <Paragraph>{t("ourService")}</Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
