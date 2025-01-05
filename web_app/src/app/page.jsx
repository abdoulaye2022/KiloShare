"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Platform/Layouts/Navbar";
import {
  Affix,
  Button,
  Col,
  Divider,
  Layout,
  Row,
  Skeleton,
  Spin,
  Tooltip,
} from "antd";
import Footer from "./components/Platform/Layouts/Footer";
import Login from "./components/Platform/Layouts/Login";
import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";
import AdsList from "./components/Platform/Home/AdsList ";
import Signin from "./components/Platform/Layouts/Signin";
import FilterAd from "./components/Platform/Ads/FilterAd";
import RequestResetPassword from "./components/Platform/Layouts/RequestResetPassword";
import { userActions } from "./lib/redux/actions/users.actions";
import { FilterOutlined } from "@ant-design/icons";
import MobileFilterAds from "./components/Platform/Ads/MobileFilterAds";
import { modalActions } from "./lib/redux/actions/modals.actions";
import { adActions } from "./lib/redux/actions/ads.actions";
import { categoryActions } from "./lib/redux/actions/categories.actions";
import VerifiedEmail from "./components/Platform/Layouts/VerifiedEmail";
import { ConfigProvider } from "antd";
import frFR from "antd/locale/fr_FR";
import en_US from "antd/locale/en_US";
import { preferenceActions } from "./lib/redux/actions/preferences.actions";
import { useTranslations } from "use-intl";
import Head from "next/head";

const { Content } = Layout;

function Home() {
  const openLogin = useAppSelector((state) => state.modal.isOpenLoginForm);
  const openSignin = useAppSelector((state) => state.modal.isOpenSigninForm);
  const openMobileFilterAds = useAppSelector(
    (state) => state.modal.isOpenMobileFilterAds
  );
  const openRequestResetPassword = useAppSelector(
    (state) => state.modal.isOpenRequestResetPassword
  );
  const loadingLogout = useAppSelector((state) => state.user.loadingLogout);
  const loading = useAppSelector((state) => state.ad.loading);
  const loadingCategory = useAppSelector((state) => state.category.loading);
  const isFiltered = useAppSelector((state) => state.ad.isFiltered);
  const categories = useAppSelector((state) => state.category.items);
  const ads = useAppSelector((state) => state.ad.items);
  const lastFetchedAdTime = useAppSelector(
    (state) => state.ad.lastFetchedAdTime
  );
  const openVerifiedEmail = useAppSelector(
    (state) => state.modal.isOpenVerifiedEmail
  );
  const lastFetchedCategoryTime = useAppSelector(
    (state) => state.category.lastFetchedCategoryTime
  );
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.preference.item);
  const language = useAppSelector((state) => state.preference.language);
  const page = useAppSelector((state) => state.ad.page);
  const hasMore = useAppSelector((state) => state.ad.hasMore);
  const t = useTranslations("AccueilPage");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (loadingLogout) {
      dispatch(userActions.successLogOut());
      dispatch(adActions.getAll());
      dispatch(categoryActions.getAll());
    }
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMobileChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMobileChange);

    handleMobileChange(mediaQuery);

    const currentTime = Date.now();
    if (
      ads.length === 0 ||
      (lastFetchedAdTime && currentTime - lastFetchedAdTime > 5 * 60 * 1000)
    ) {
      dispatch(adActions.getAll());
    }
    if (
      categories.length === 0 ||
      (lastFetchedCategoryTime &&
        currentTime - lastFetchedCategoryTime > 5 * 60 * 1000)
    ) {
      dispatch(categoryActions.getAll());
    }

    dispatch(adActions.resetFilter());
    dispatch(modalActions.closeMobileFilterAds());

    if (Object.keys(item).length > 0 && item.user_language !== language) {
      dispatch(preferenceActions.changeLangage(item.user_language));
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{ cssVar: true }}
      locale={
        (navigator.language || navigator.languages[0]).split("-")[0] === "fr"
          ? frFR
          : en_US
      }
    >
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout style={{ minHeight: "calc(100vh)" }}>
        <Affix offsetTop={0}>
          <Navbar />
        </Affix>
        <Spin spinning={loadingLogout}>
          <Content style={{ marginTop: 15, minHeight: "calc(90vh)" }}>
            <Row
              justify="center"
              style={{
                maxWidth: "95%",
                margin: "auto",
              }}
            >
              <Col offset={isMobile ? 0 : 2} span={20}>
                {isMobile ? (
                  <>
                    <Button
                      type={isFiltered ? "primary" : "default"}
                      size="large"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.3s",
                      }}
                      onClick={() =>
                        dispatch(modalActions.openMobileFilterAds())
                      }
                    >
                      <Tooltip
                        title={isFiltered ? "Filters applied" : "Apply filters"}
                      >
                        <FilterOutlined
                          spin={isFiltered}
                          style={{
                            color: isFiltered ? "#1890ff" : "#8c8c8c",
                          }}
                        />
                      </Tooltip>
                      {isFiltered ? "Filtered" : "Filter"}
                    </Button>
                  </>
                ) : (
                  <FilterAd />
                )}
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Divider style={{ marginTop: isMobile ? 17 : null }} />
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
            {hasMore === true && ads.length >= 10 ? (
              <Row justify="center">
                <Button
                  style={{ width: "93%", marginBottom: 30 }}
                  onClick={() =>
                    dispatch(adActions.getAllPaginate(page, 10))
                  }
                >
                  {t("loadMore")}
                </Button>
              </Row>
            ) : null}
          </Content>
        </Spin>

        <Affix offsetBottom={0}>
          <Footer />
        </Affix>

        {openLogin && <Login />}
        {openSignin && <Signin />}
        {openRequestResetPassword && <RequestResetPassword />}
        {openMobileFilterAds && <MobileFilterAds />}
        {openVerifiedEmail && <VerifiedEmail />}
      </Layout>
    </ConfigProvider>
  );
}

export default Home;
