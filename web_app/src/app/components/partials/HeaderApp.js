import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { logout } from "../../actions/auth/logout";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header } = Layout;

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

function HeaderApp() {
  const router = useRouter();
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: "#001529",
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 20,
        }}
      >
        {/* <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        /> */}
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
                setTimeout(() => {
                  router.replace("/login");
                }, 2000);
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
    </>
  );
}

export default HeaderApp;
