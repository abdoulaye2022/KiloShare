"use client";

import Footer from "../components/Platform/Layouts/Footer";
import Navbar from "../components/Platform/Layouts/Navbar";
import Login from "../components/Platform/Layouts/Login";
import React, { useEffect } from "react";
import { Affix, Col, Layout, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import Signin from "../components/Platform/Layouts/Signin";
import { userActions } from "../lib/redux/actions/users.actions";
import { useRouter } from "next/navigation";

const { Content } = Layout;

function PlatformLayout({ children }) {
  const openLogin = useAppSelector((state) => state.modal.isOpenLoginForm);
  const openSignin = useAppSelector((state) => state.modal.isOpenSigninForm);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(userActions.isValidJwt(() => router.replace("/")));
  }, []);

  return (
    <>
      <Layout>
        <Affix offsetTop={0}>
          <Navbar />
        </Affix>

        <Content style={{ marginTop: 15, minHeight: "calc(100vh - 91px)" }}>
          <Row>
            <Col md={4} style={{ padding: 10 }}></Col>
            <Col xs={24} sm={24} md={16} style={{ padding: 10 }}>
              {children}
            </Col>
          </Row>
        </Content>

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
