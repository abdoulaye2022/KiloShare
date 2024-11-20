"use client";

import React, { useEffect } from "react";
import Navbar from "./components/Platform/Layouts/Navbar";
import { Affix, Col, Layout, Row, Skeleton } from "antd";
import Footer from "./components/Platform/Layouts/Footer";
import Login from "./components/Platform/Layouts/Login";
import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";
import { adActions } from "./lib/redux/actions/ads.actions";
import AdsList from "./components/Platform/Home/AdsList ";

const { Content } = Layout;

function Home() {
  const loading = useAppSelector((state) => state.ad.loading);
  const dispatch = useAppDispatch();

  // Fetching ads when the component mounts
  useEffect(() => {
    dispatch(adActions.getAll());
  }, [dispatch]); // Added dispatch to the dependency array for optimal effect handling

  return (
    <Layout>
      {/* Navbar affixed to the top */}
      <Affix offsetTop={0}>
        <Navbar />
      </Affix>

      {/* Main content section */}
      <Content style={{ marginTop: 15 }}>
        <Row
          gutter={[16, 16]} // Responsive gutter for better spacing
          justify="start"
          style={{
            maxWidth: "90%", // Ensure content doesn't stretch too wide
            margin: "auto", // Centering the content
            paddingBottom: 20, // Ensure space below content
          }}
        >
          {loading ? (
            // Render a skeleton of ads if loading is true
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((p, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Skeleton active paragraph={{ rows: 5 }} />
              </Col>
            ))
          ) : (
            // Otherwise, render the AdsList
            <AdsList />
          )}
        </Row>
      </Content>

      {/* Footer affixed to the bottom */}
      <Affix offsetBottom={0}>
        <Footer />
      </Affix>

      {/* Login modal or form */}
      <Login />
    </Layout>
  );
}

export default Home;
