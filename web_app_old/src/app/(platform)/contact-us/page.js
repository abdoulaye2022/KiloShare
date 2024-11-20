"use client";

// HomePage.js
import React from "react";
import {
  Layout,
  Menu,
  Carousel,
  Row,
  Col,
  Input,
  Button,
  Card,
  Form,
  Select,
  List,
  Typography,
  Space,
  Avatar,
} from "antd";
import {
  MailOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

function ContactUs() {
  return <>
  <Content
        style={{
          padding: "40px 0",
          textAlign: "center",
          backgroundColor: "#f8f8f8",
        }}
      >
        <Title level={2}>Contactez-nous</Title>
        <Form layout="vertical" style={{ maxWidth: "600px", margin: "auto" }}>
          <Form.Item label="Votre Nom">
            <Input placeholder="Votre Nom" />
          </Form.Item>
          <Form.Item label="Votre Email">
            <Input type="email" placeholder="Votre Email" />
          </Form.Item>
          <Form.Item label="Message">
            <Input.TextArea rows={4} placeholder="Message" />
          </Form.Item>
          <Button type="primary" icon={<MailOutlined />}>
            Envoyer
          </Button>
        </Form>
      </Content></>;
}

export default ContactUs;
