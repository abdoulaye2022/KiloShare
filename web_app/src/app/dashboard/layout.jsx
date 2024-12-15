"use client";

import React, { useEffect, useState } from "react";
import {
  FileOutlined,
  TeamOutlined,
  DashboardOutlined,
  NotificationOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderApp from "../components/Dashboard/Layout/HeaderApp";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { menuActions } from "../lib/redux/actions/menus.actions";
import Link from "next/link";

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
    getItem("Users", "2"),
    getItem("Profiles", "3"),
    getItem("Activity and History", "4"),
  ]),
  getItem("Ads", "sub2", <NotificationOutlined />, [
    getItem("Ads", "5"),
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
  const user = useAppSelector(state => state.user.user)

  const [selectedItem, setSelectedItem] = useState("1");
  const dispatch = useAppDispatch();
  const key = useAppSelector((state) => state.menu.key);
  const breadcrumb = useAppSelector((state) => state.menu.breadcrumb);

  const handleSideBarMenu = (key) => {
    switch (key) {
      case "1":
        dispatch(
          menuActions.selectedSideBarMenu(
            { key: key, breadcrumb: [{ title: "Dashboard" }] },
            () => router.push("/dashboard")
          )
        );
        break;
      case "2":
        dispatch(
          menuActions.selectedSideBarMenu(
            {
              key: key,
              breadcrumb: [{ title: "Dashboard" }, { title: "Users" }],
            },
            () => router.push("/dashboard/users")
          )
        );
        break;
      case "3":
        dispatch(
          menuActions.selectedSideBarMenu(
            {
              key: key,
              breadcrumb: [{ title: "Dashboard" }, { title: "Profiles" }],
            },
            () => router.push("/dashboard/profiles")
          )
        );
        break;
      case "5":
        dispatch(
          menuActions.selectedSideBarMenu(
            {
              key: key,
              breadcrumb: [{ title: "Dashboard" }, { title: "Ads" }],
            },
            () => router.push("/dashboard/ads")
          )
        );
        break;
    }
  };

  useEffect(() => {
    if(user.profile_id !== 1) {
      redirect('/');
    }
  }, []);

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
          defaultSelectedKeys={[key]}
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
          Kilo-Share © {new Date().getFullYear()} Created by <Link href="https://m2atech.com" target="_blank">M2atech</Link> All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
