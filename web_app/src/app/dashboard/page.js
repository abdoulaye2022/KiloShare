"use client";

import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";
import { getAll } from "../actions/users/getAll";
import { logout } from "../actions/auth/logout";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

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

const items = [
  {
    key: "1",
    label: (
      <>
        <UserOutlined />
        &nbsp;
        <Link href="/profil">My profil</Link>
      </>
    ),
  },
  {
    key: "2",
    label: (
      <>
        <SettingOutlined />
        &nbsp;
        <Link href="/settings">Settings</Link>
      </>
    ),
  },
  {
    key: "3",
    danger: true,
    label: (
      <div>
        <LogoutOutlined />
        &nbsp; Log out
      </div>
    ),
  },
];

const itemsHeader = [
  {
    label: "Test",
    key: "1",
  },
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const getStatus = async () => {
    try {
      let result = await getAll();
      if (result.status == 200) {
        //   setLoading(false);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      // setError(error.message);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
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
            backgroundColor: "white"
          }}
        >
          <h3 style={{ color: "black", fontWeight: "bold" }}>KILOSHARE</h3>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={itemsSidebar}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#001529",
            display: "flex",
            justifyContent: "space-between",
            paddingRight: 20,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={itemsHeader}
            style={{
              minWidth: 0,
              flex: 1,
            }}
          />

          <Dropdown
            menu={{
              items,
              onClick: (value) => {
                if (value.key == 3) {
                  logout();
                  router.replace("/");
                }
              },
            }}
            trigger={["click"]}
            size="large"
          >
            <div
              onClick={(e) => e.preventDefault()}
              style={{ cursor: "pointer", display: "flex" }}
            >
              <h3 style={{ color: "white" }}>Abdoulaye Mohamed Ahmed</h3>
              &nbsp;
              <Space>
                <Avatar icon={<UserOutlined />} />
              </Space>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;