"use client";

import Footer from "../components/Platform/Layouts/Footer";
import Navbar from "../components/Platform/Layouts/Navbar";
import Login from "../components/Platform/Layouts/Login";
import React, { useEffect } from "react";
import { Affix, Col, Layout, Row, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import Signin from "../components/Platform/Layouts/Signin";
import { userActions } from "../lib/redux/actions/users.actions";
import { useRouter } from "next/navigation";
import ResetPassword from "../components/Platform/Layouts/RequestResetPassword";

const { Content } = Layout;

function PlatformLayout({ children }) {
  const openLogin = useAppSelector((state) => state.modal.isOpenLoginForm);
  const openSignin = useAppSelector((state) => state.modal.isOpenSigninForm);
  const openResetPassword = useAppSelector(
    (state) => state.modal.isOpenRequestResetPassword
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const lastJwtTime = useAppSelector((state) => state.user.lastJwtTime);
  const loadingLogout = useAppSelector((state) => state.user.loadingLogout);

  useEffect(() => {
    const currentTime = Date.now();
    if (lastJwtTime && currentTime - lastJwtTime > 30 * 60 * 1000) {
      dispatch(userActions.isValidJwt(() => router.replace("/")));
    }
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "calc(100vh)" }}>
        <Affix offsetTop={0}>
          <Navbar />
        </Affix>

        <Spin spinning={loadingLogout}>
          <Content style={{ marginTop: 15 }}>{children}</Content>
        </Spin>

        <Affix offsetBottom={0}>
          <Footer />
        </Affix>

        {openLogin && <Login />}
        {openSignin && <Signin />}
        {openResetPassword && <ResetPassword />}
      </Layout>
    </>
  );
}

export default PlatformLayout;
