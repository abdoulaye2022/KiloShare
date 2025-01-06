"use client";

import React from "react";
import { Form, Input, Button, Typography, Row, Col, Card, Divider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const t = useTranslations("ContactUsPage");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire (par exemple, une requête API)
    // alert("Votre message a été envoyé avec succès !");
    console.log(values);
    form.resetFields(); // Réinitialiser le formulaire après l'envoi
  };

  return (
    <div style={{ padding: 10, height: "90vh" }}>
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
              <Col xs={24} md={12}>
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
                    <Button type="primary" htmlType="submit" size="large" block>
                      {t("sendMessage")}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>

              {/* Coordonnées de contact */}
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
