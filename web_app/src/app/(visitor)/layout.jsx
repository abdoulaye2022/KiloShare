"use client";

import Footer from "@/app/components/Platform/Layouts/Footer";
import Navbar from "@/app/components/Platform/Layouts/Navbar";
import Login from "@/app/components/Platform/Layouts/Login";
import React, { useEffect, useState } from "react";
import { Affix, Col, Layout, Row, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import Signin from "@/app/components/Platform/Layouts/Signin";

const { Content } = Layout;

function PlatformLayout({ children }) {
  const openLogin = useAppSelector((state) => state.modal.isOpenLoginForm);
  const openSignin = useAppSelector((state) => state.modal.isOpenSigninForm);
  const loadingLogout = useAppSelector((state) => state.user.loadingLogout);
  const router = useRouter();

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

  return (
    <>
      <Layout style={{ minHeight: "calc(100vh)" }}>
        <Affix offsetTop={0}>
          <Navbar />
        </Affix>

        <Spin spinning={loadingLogout}>
          <Content style={{ minHeight: "calc(90vh)" }}>
            <Row>
              {isMobile ? null : <Col md={4} style={{ padding: 10 }}></Col>}
              <Col xs={24} sm={24} md={16} style={{ padding: 10 }}>
                {children}
              </Col>
            </Row>
          </Content>
        </Spin>

        <Affix offsetBottom={0}>
          <Footer />
        </Affix>

        {openLogin && <Login />}
        {openSignin && <Signin />}
      </Layout>
    </>
  );
}

export default PlatformLayout;
