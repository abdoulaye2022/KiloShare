"use client";

import React, { useEffect, useState } from "react";
import { Layout, Button, Avatar, Dropdown, Select } from "antd";
import {
  UserOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { setLanguage } from "../../../actions/others/setLanguage";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Header } = Layout;

function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector((state) => state.user.authenticated);

  const [defLanguage, setDefLanguage] = useState("fr");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMobileChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMobileChange);

    handleMobileChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  const items1 = [
    {
      key: "1",
      label: (
        <>
          <LoginOutlined /> Log In
        </>
      )
    },
    {
      key: "2",
      label: (
        <>
          <UserAddOutlined /> Sign In
        </>
      )
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <>
          <InfoCircleOutlined /> About us
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
          <SettingOutlined /> Settings
        </>
      ),
    },
  ];

  const items = [
    {
      key: "3",
      label: (
        <>
          <UnorderedListOutlined /> My Listings
        </>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <>
          <InfoCircleOutlined /> About us
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
          <SettingOutlined /> Settings
        </>
      ),
    },
    {
      key: "6",
      label: (
        <>
          <LogoutOutlined /> Logout
        </>
      ),
    },
  ];

  const handleHeaderDropdown = (key) => {
    switch (key) {
      case "1":
        dispatch(modalActions.openLoginForm());
        break;
      case "2":
        dispatch(modalActions.openSigninForm());
        break;
      case "6":
        dispatch(userActions.logout(() => router.replace("/")));
        break;
      default:
        break;
    }
  };

  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="demo-logo" style={{ width: 100 }}>
        <h3 style={{ color: "white", fontWeight: "bold" }}>
          <Image
            src={isMobile ? "/logo_mobile.png" : "/logo.png"}
            width={isMobile ? 105 : 200}
            height={isMobile ? 35 : 50}
            alt="Logo"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          />
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginLeft: 5,
        }}
      >
        {isMobile === false ? (
          <>
            <Select
              defaultValue={defLanguage}
              onChange={(value) => {
                const language = (
                  navigator.language || navigator.languages[0]
                ).split("-")[0];
                setLanguage(value != language ? value : language);
              }}
              options={[
                { value: "en", label: "Englais" },
                { value: "fr", label: "Francais" },
              ]}
              style={{ marginRight: 20, width: 100 }}
            />

            <Button
              size={isMobile ? "middle" : "large"}
              icon={<PlusCircleOutlined />}
              type="primary"
              style={{ marginRight: 20 }}
              onClick={() => {
                authenticated
                  ? router.push("/post-ad")
                  : dispatch(modalActions.openLoginForm());
              }}
            >
              Create an Ad
            </Button>
          </>
        ) : null}

        <Dropdown
          menu={{
            items: authenticated ? items : items1,
            onClick: (value) => handleHeaderDropdown(value.key),
          }}
          trigger={["click"]}
        >
          <div
            onClick={(e) => e.preventDefault()}
            style={{ cursor: "pointer" }}
          >
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ color: "black", backgroundColor: "white" }}
            />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

export default Navbar;
