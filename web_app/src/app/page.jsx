"use client";

import React, { useEffect } from "react";
import Navbar from "./components/Platform/Layouts/Navbar";
import { Affix, Col, Divider, Layout, Row, Skeleton } from "antd";
import Footer from "./components/Platform/Layouts/Footer";
import Login from "./components/Platform/Layouts/Login";
import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";
import { adActions } from "./lib/redux/actions/ads.actions";
import AdsList from "./components/Platform/Home/AdsList ";
import Signin from "./components/Platform/Layouts/Signin";
import FilterAd from "./components/Platform/Ads/FilterAd";
import { categoryActions } from "./lib/redux/actions/categories.actions";

const { Content } = Layout;

function Home() {
  const loading = useAppSelector((state) => state.ad.loading);
  const loadingCategory = useAppSelector((state) => state.category.loading);
  const dispatch = useAppDispatch();

  // Fetching ads when the component mounts
  useEffect(() => {
    dispatch(adActions.getAll());
    dispatch(categoryActions.getAll());
    console.log("Je suis home monter")
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: "calc(100vh)" }}>
      <Affix offsetTop={0}>
        <Navbar />
      </Affix>

      <Content style={{ marginTop: 15 }}>
        <Row
          justify="center"
          style={{
            maxWidth: "95%",
            margin: "auto",
          }}
        >
          <Col offset={2} span={20}>
            <FilterAd />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Divider />
          </Col>
        </Row>

        <Row
          gutter={[16, 16]}
          justify="start"
          style={{
            maxWidth: "95%",
            margin: "auto",
            paddingBottom: 20,
          }}
        >
          {loading || loadingCategory ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((p, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Skeleton active paragraph={{ rows: 5 }} />
              </Col>
            ))
          ) : (
            <AdsList />
          )}
        </Row>
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
