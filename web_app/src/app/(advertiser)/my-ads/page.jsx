"use client";

import FilterAd from "@/app/components/Platform/Ads/FilterAd";
import AdsList from "@/app/components/Platform/Home/AdsList ";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Skeleton, Tooltip } from "antd";
import { useEffect, useState } from "react";

function MyAds() {
  const [isMobile, setIsMobile] = useState(false);
  const isFiltered = useAppSelector((state) => state.ad.isFiltered);
  const loading = useAppSelector((state) => state.ad.loading);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMobileChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMobileChange);

    handleMobileChange(mediaQuery);
  }, []);

  return (
    <>
      <Row>
        <Col md={4} style={{ padding: 10 }}></Col>
        <Col xs={24} sm={24} md={16} style={{ padding: 10 }}>
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
                onClick={() => dispatch(modalActions.openMobileFilterAds())}
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
          width: "100%",
          maxWidth: "95%",
          margin: "auto",
          paddingBottom: 20,
        }}
      >
        {/* <Col md={4} style={{ padding: 10 }}></Col> */}
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((p, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Skeleton active paragraph={{ rows: 5 }} />
            </Col>
          ))
        ) : (
          <AdsList />
        )}
      </Row>
    </>
  );
}

export default MyAds;
