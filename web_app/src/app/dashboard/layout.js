"use client";

import React, { useState } from "react";
import {
  FileOutlined,
  TeamOutlined,
  DashboardOutlined,
  NotificationOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderApp from "../components/partials/HeaderApp";
import { useRouter } from "next/navigation";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const itemsSidebar = [
  getItem("Dashboard", "1", <DashboardOutlined />),
  getItem("Users", "sub1", <TeamOutlined />, [
    getItem("User", "2"),
    getItem("Profil", "3"),
    getItem("To appouved", "4"),
  ]),
  getItem("Announcements", "sub2", <NotificationOutlined />, [
    getItem("Announcement", "5"),
    getItem("Status", "6"),
    getItem("To appouved", "7"),
  ]),
  getItem("Files", "8", <FileOutlined />),
];
const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const [breadcrumb, setBreadcrumb] = useState([
    {
      title: "Dashboard",
    },
  ]);
  const [selectedItem, setSelectedItem] = useState("1");

  const handleSideBarMenu = (key) => {
    switch (key) {
      case "1":
        setBreadcrumb([{ title: "Dashboard" }]);
        setSelectedItem("1");
        router.push("/dashboard");
        break;
      case "2":
        setBreadcrumb([
          {
            title: "Dashboard",
          },
          { title: "Users" },
        ]);
        setSelectedItem("2")
        router.push("/dashboard/users");
        break;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <h3 style={{ color: "black", fontWeight: "bold" }}>KILOSHARE</h3>
        </div>
        <br />
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedItem]}
          mode="inline"
          items={itemsSidebar}
          onClick={(value) => handleSideBarMenu(value.key)}
        />
      </Sider>
      <Layout style={{ minHeight: "80vh" }}>
        <HeaderApp />
        <Content
          style={{
            margin: "0 16px",
            minHeight: 280,
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={breadcrumb}
          />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          KILOSHARE © {new Date().getFullYear()} Created by M2acode
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
