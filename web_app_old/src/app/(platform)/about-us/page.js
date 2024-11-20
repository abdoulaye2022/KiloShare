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

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

function AboutUs() {
  return (
    <>
      <Content style={{ padding: "40px 0", textAlign: "center" }}>
        <Title level={2}>À propos de nous</Title>
        <Text>
          Kiloshare est une plateforme qui permet de connecter les voyageurs
          disposant d’espace avec des personnes ayant des besoins de transport.
        </Text>
      </Content>

      <Content
        style={{
          padding: "40px 0",
          backgroundColor: "#f8f8f8",
          textAlign: "center",
        }}
      >
        <Title level={2}>FAQ</Title>
        <List
          dataSource={[
            {
              question: "Comment fonctionne Kiloshare ?",
              answer: "Explication sur le fonctionnement de la plateforme.",
            },
            {
              question: "Est-ce sécurisé ?",
              answer:
                "Informations sur la sécurité et les garanties offertes aux utilisateurs.",
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.question} description={item.answer} />
            </List.Item>
          )}
          style={{ maxWidth: "80%", margin: "auto" }}
        />
      </Content>

      <Content style={{ padding: "40px 0", textAlign: "center" }}>
        <Title level={2}>Avis des utilisateurs</Title>
        <Carousel autoplay style={{ maxWidth: "90%", margin: "auto" }}>
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} style={{ padding: 20, textAlign: "center" }}>
              <Card>
                <Text>"Service fiable et pratique pour tous mes envois !"</Text>
                <p>Utilisateur {idx + 1}</p>
              </Card>
            </div>
          ))}
        </Carousel>
      </Content>
    </>
  );
}

export default AboutUs;
