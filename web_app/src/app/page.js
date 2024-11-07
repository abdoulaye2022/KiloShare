"use client";

// HomePage.js
import React, { useState } from "react";
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
  UserOutlined,
  SearchOutlined,
  MailOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
  BarsOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import HeaderAppPlatform from "./components/partials/HeaderAppPlatform";
import ListingFormPlatform from "./components/drawers/ListingFormPlatform";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

function HomePage() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <HeaderAppPlatform setOpen={setOpen} />
      <Content style={{ padding: "20px 0", textAlign: "center" }}>
        <Form
          layout="inline"
          style={{
            marginTop: -120,
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 8,
            maxWidth: "80%",
            margin: "auto",
          }}
        >
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item>
                <Input placeholder="Lieu de départ" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item>
                <Input placeholder="Destination" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item>
                <Input type="number" placeholder="Poids (kg)" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item>
                <Input type="date" placeholder="Date" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item>
                <Select placeholder="Catégorie" style={{ width: "100%" }}>
                  <Option value="electronics">Électronique</Option>
                  <Option value="clothing">Vêtements</Option>
                  <Option value="documents">Documents</Option>
                  <Option value="other">Autre</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item>
                <Input type="number" placeholder="Prix Max (€)" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Button type="primary" icon={<SearchOutlined />}>
                Rechercher
              </Button>
            </Col>
          </Row>
        </Form>
      </Content>

      <Content
        style={{
          padding: "40px 0",
          textAlign: "center",
          backgroundColor: "#f8f8f8",
        }}
      >
        {/* <Title level={2}>Annonces en vedette</Title> */}
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{ maxWidth: "90%", margin: "auto" }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} key={idx}>
              <Card
                // title={`Annonce Vedette ${idx + 1}`}
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Text>
                  Description de l'annonce. Lorem ipsum dolor sit amet.
                </Text>
                <Button type="primary" style={{ marginTop: 10 }}>
                  Voir plus
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        ©2024 Kiloshare. Tous droits réservés.
      </Footer>
      <ListingFormPlatform
        showDrawer={showDrawer}
        open={open}
        onClose={onClose}
      />
    </Layout>
  );
}

export default HomePage;
