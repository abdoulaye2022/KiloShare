"use client";

import React from "react";
import Navbar from "./components/Platform/Layouts/Navbar";
import { Affix, Layout } from "antd";
import Footer from "./components/Platform/Layouts/Footer";
import Login from "./components/Platform/Layouts/Login";
import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";
import Signin from "./components/Platform/Layouts/Signin";

const { Content } = Layout;

function Home() {
  const loading = useAppSelector((state) => state.ad.loading);
  const loadingCategory = useAppSelector((state) => state.category.loading);
  const dispatch = useAppDispatch();

  return (
    <Layout style={{ minHeight: "calc(100vh)" }}>
      <Affix offsetTop={0}>
        <Navbar />
      </Affix>

      <Content
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>404 - Page Not Found</h1>
      </Content>

      <Affix offsetBottom={0}>
        <Footer />
      </Affix>

      <Login />
      <Signin />
    </Layout>
  );
}

export default Home;
