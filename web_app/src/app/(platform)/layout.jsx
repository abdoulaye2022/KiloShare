"use client";

import Footer from "../components/Platform/Layouts/Footer";
import Navbar from "../components/Platform/Layouts/Navbar";
import Login from "../components/Platform/Layouts/Login";
import React, { useState } from "react";
import { Affix, Col, Layout, Row } from "antd";
import { useAppSelector } from "../lib/redux/hooks";

const { Content } = Layout;

function PlatformLayout({ children }) {
  const openLogin = useAppSelector((state) => state.modal.isOpenLoginForm);

  return (
    <Layout>
      {/* Navbar fixée en haut */}
      <Affix offsetTop={0}>
        <Navbar />
      </Affix>

      {/* Contenu principal avec un espacement adapté */}
      <Content style={{ marginTop: 15, minHeight: "calc(100vh - 91px)" }}>
        <Row>
        <Col md={4} style={{ padding: 10}}></Col>
          <Col xs={24} sm={24} md={16} style={{ padding: 10}}>{children}</Col>
          {/* <Col xs={24} sm={24} md={8}><h3>Tu sais pas</h3></Col> */}
        </Row>
      </Content>

      {/* Footer fixé en bas */}
      <Affix offsetBottom={0}>
        <Footer />
      </Affix>

      {/* Modal de connexion conditionnel */}
      {openLogin && <Login />}
    </Layout>
  );
}

export default PlatformLayout;
