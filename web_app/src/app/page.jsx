"use client";

import React, { useEffect } from "react";
import Navbar from "./components/Platform/Layouts/Navbar";
import { Affix, Layout, Row } from "antd";
import Footer from "./components/Platform/Layouts/Footer";
import Login from "./components/Platform/Layouts/Login";
import { useAppDispatch } from "./lib/redux/hooks";
import { adActions } from "./lib/redux/actions/ads.actions";
import AdsList from "./components/Platform/Home/AdsList ";

const { Content } = Layout;

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adActions.getAll());
  }, []);
  return (
    <>
      <Layout>
        <Affix offsetTop={0}>
          <Navbar />
        </Affix>

        <Content style={{ marginTop: 15 }}>
          <Row
            gutter={[16, 16]}
            justify="start"
            style={{ maxWidth: "90%", margin: "auto" }}
          >
            <AdsList />
          </Row>
        </Content>

        <Affix offsetBottom={0}>
          <Footer />
        </Affix>

        <Login />
      </Layout>
    </>
  );
}

export default Home;
