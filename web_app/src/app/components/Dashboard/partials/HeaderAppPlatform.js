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

const items = [
  {
    key: "1",
    icon: <PlusCircleOutlined />,
    label: "Post a Listing",
  },
];

const items1 = [
  {
    key: "sub1",
    label: "",
    icon: (
      <Avatar
        style={{ backgroundColor: "white" }}
        size="large"
        icon={<UserOutlined style={{ color: "black" }} />}
      />
    ),
    children: [
      {
        key: "2",
        label: "Log In",
      },
      {
        key: "3",
        label: "Sign In",
      },
      {
        key: "4",
        label: "My Listings",
      },
      {
        type: "divider",
      },
      {
        key: "5",
        label: "About us",
      },
      {
        key: "6",
        label: "Help Center",
      },
      {
        key: "7",
        label: "Settings",
      },
    ],
  },
];

function HeaderAppPlatform({ setOpen }) {
  const handleHeaderMenu = (key) => {
    switch (key) {
      case "1":
        setOpen(true);
        break;
    }
  };
  return (
    <>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="demo-logo" style={{ width: 100 }}>
          <h3 style={{ color: "white", fontWeight: "bold" }}>KILO-SHARE</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginLeft: 5
          }}
        >
          <Button
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpen(true)}
            type="primary"
          >
            Post a Listing
          </Button>

          <Menu
            theme="dark"
            mode="horizontal"
            //   defaultSelectedKeys={["2"]}
            items={items1}
            // style={{ display: "flex", justifyContent: "center" }}
            onClick={(value) => handleHeaderMenu(value.key)}
          />
        </div>
      </Header>
    </>
  );
}

export default HeaderAppPlatform;
