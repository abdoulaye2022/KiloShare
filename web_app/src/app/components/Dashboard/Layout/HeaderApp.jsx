import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { logout } from "../../../actions/auth/logout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

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

function HeaderApp() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const cb = () => {
    router.replace("/");
  };

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: "#001529",
          display: "flex",
          justifyContent: "end",
          paddingRight: 20,
        }}
      >
        <Dropdown
          menu={{
            items,
            onClick: (value) => {
              if (value.key == 3) {
                setTimeout(() => {
                  dispatch(userActions.logout(cb));
                }, 200);
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
            <h3
              style={{ color: "white" }}
            >{`${user.firstname} ${user.lastname}`}</h3>
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
