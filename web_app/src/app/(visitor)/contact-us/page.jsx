"use client";

import React from "react";
import { Form, Input, Button, Typography, Row, Col, Card } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire (par exemple, une requête API)
    // alert("Votre message a été envoyé avec succès !");
    form.resetFields(); // Réinitialiser le formulaire après l'envoi
  };

  return (
    <div style={{ padding: "5px 5px" }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card>
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "24px" }}
            >
              Contactez-nous
            </Title>

            <Paragraph style={{ fontSize: "16px", textAlign: "center" }}>
              Vous avez des questions, des suggestions ou besoin d'aide ?
              Remplissez le formulaire ci-dessous ou utilisez nos coordonnées
              pour nous contacter.
            </Paragraph>

            <Row gutter={[24, 24]}>
              {/* Formulaire de contact */}
              <Col xs={24} md={12}>
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="name"
                    label="Nom"
                    rules={[
                      { required: true, message: "Veuillez entrer votre nom" },
                    ]}
                  >
                    <Input placeholder="Votre nom" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrer votre email",
                      },
                      {
                        type: "email",
                        message: "Veuillez entrer un email valide",
                      },
                    ]}
                  >
                    <Input placeholder="Votre email" />
                  </Form.Item>

                  <Form.Item
                    name="subject"
                    label="Sujet"
                    rules={[
                      { required: true, message: "Veuillez entrer un sujet" },
                    ]}
                  >
                    <Input placeholder="Sujet de votre message" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrer votre message",
                      },
                    ]}
                  >
                    <TextArea rows={6} placeholder="Votre message" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Envoyer
                    </Button>
                  </Form.Item>
                </Form>
              </Col>

              {/* Coordonnées de contact */}
              <Col xs={24} md={12}>
                <Title level={4}>Coordonnées</Title>
                <Paragraph>
                  <MailOutlined /> Email :{" "}
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

                <Title level={4} style={{ marginTop: "24px" }}>
                  Disponibilité
                </Title>
                <Paragraph>
                  Notre service est disponible 24h/24, 7j/7.
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
