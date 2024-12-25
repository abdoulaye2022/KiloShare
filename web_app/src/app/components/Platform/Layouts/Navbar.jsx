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
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { setLanguage } from "../../../actions/others/setLanguage";
import { userActions } from "@/app/lib/redux/actions/users.actions";
import { useTranslations } from "next-intl";

const { Header } = Layout;

function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector((state) => state.user.authenticated);
  const user = useAppSelector((state) => state.user.user);
  const t = useTranslations("NavbarPage");

  const pathname = usePathname();

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
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <LoginOutlined /> {t("login")}
        </>
      ),
    },
    {
      key: "2",
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <UserAddOutlined /> {t("signUp")}
        </>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <InfoCircleOutlined /> {t("aboutUs")}
        </>
      ),
    },
    {
      key: "5",
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <SettingOutlined /> {t("settings")}
        </>
      ),
    },
    // {
    //   key: "8",
    //   style: {
    //     fontSize: 16,
    //     lineHeight: "30px"
    //   },
    //   label: (
    //     <>
    //       Francais
    //     </>
    //   ),
    // },
  ];

  const items = [
    {
      key: "3",
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <UserOutlined /> {t("myProfil")}
        </>
      ),
    },
    {
      key: "4",
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <UnorderedListOutlined /> {t("myAds")}
        </>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "5",
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <InfoCircleOutlined /> {t("aboutUs")}
        </>
      ),
    },
    {
      key: "6",
      style: {
        fontSize: 16,
        lineHeight: "30px"
      },
      label: (
        <>
          <SettingOutlined /> {t("settings")}
        </>
      ),
    },
    // {
    //   key: "8",
    //   style: {
    //     fontSize: 16,
    //     lineHeight: "30px"
    //   },
    //   label: (
    //     <>
    //       Francais
    //     </>
    //   ),
    // },
    {
      key: "7",
      style: {
        fontSize: 16,
        lineHeight: "30px",
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold"
      },
      label: (
        <>
          <LogoutOutlined /> {t("logout")}
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
      case "3":
        if (authenticated && user && user.isVerified == 1) {
          router.push("/my-profil");
        } else {
          dispatch(modalActions.openVerifiedEmail());
        }
        break;
      case "4":
        if (authenticated && user && user.isVerified == 1) {
          router.push("/my-ads");
        } else {
          dispatch(modalActions.openVerifiedEmail());
        }
        break;
      case "7":
        if (pathname === "/") dispatch(userActions.logout());
        else dispatch(userActions.logout(() => router.replace("/")));
        break;
      default:
        break;
    }
  };

  return (
    <Header
      style={{
        display: "flex",
        padding: isMobile ? "0px 15px" : null,
        justifyContent: "space-between",
      }}
    >
      <div
        className="demo-logo"
        style={{ minWidth: isMobile ? 100 : 180, cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <h3
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: isMobile ? 14 : 24,
          }}
        >
          <div
            style={{
              position: "relative",
              width: isMobile ? "40px" : "90px",
              height: "24px",
              margin: "20px 0px",
            }}
          >
            <Image
              alt="Logo"
              src={isMobile ? `/logo_mobile.png` : `/logo.png`}
              layout="fill"
              // objectFit="cover"
              style={{
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
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
          </>
        ) : null}

        <Button
          size={isMobile ? "middle" : "large"}
          icon={<PlusCircleOutlined />}
          type="primary"
          style={{ marginRight: 20 }}
          onClick={() => {
            if (authenticated && user && user.isVerified == 1) {
              router.push("/post-ad");
            } else if (authenticated && user && user.isVerified == 0) {
              dispatch(modalActions.openVerifiedEmail());
            } else {
              dispatch(modalActions.openLoginForm());
              dispatch(userActions.resetError());
            }
          }}
        >
          {t("createAnAd")}
        </Button>

        <Dropdown
          menu={{
            items: authenticated ? items : items1,
            onClick: (value) => handleHeaderDropdown(value.key),
            style: {
              width: 200, // Largeur du dropdown
              maxHeight: 300, // Limite de hauteur (avec scroll automatique)
              overflowY: "auto", // Scroll vertical si contenu dépasse
            },
          }}
          trigger={["click"]}
          size="large"
        >
          <div
            onClick={(e) => e.preventDefault()}
            style={{ cursor: "pointer", fontSize:  16 }}
          >
            <Avatar
              size="large"
              icon={authenticated ? null : <UserOutlined />}
              style={{ color: "white", backgroundColor: "#1677ff" }}
            >
              {authenticated
                ? `${user.firstname[0]}.${user.lastname[0]}`
                : null}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

export default Navbar;
