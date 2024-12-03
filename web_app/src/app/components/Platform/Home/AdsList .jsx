"use client";

import { Col, Button, Empty, Typography } from "antd";
import AdCard from "../Ads/AdCard";
import { useAppSelector } from "@/app/lib/redux/hooks";

const { Text } = Typography;

function AdsList() {
  const ads = useAppSelector((state) => state.ad.items);
  const filteredItems = useAppSelector((state) => state.ad.filteredItems);
  const isFiltered = useAppSelector((state) => state.ad.isFiltered);

  return (
    <>
      {isFiltered ? (
        filteredItems.length ? (
          filteredItems.map((ad, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <AdCard ad={ad} />
            </Col>
          ))
        ) : (
          <div style={{ minHeight: "calc(100vh - 235px)", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )
      ) : (
        ads.map((ad, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <AdCard ad={ad} />
          </Col>
        ))
      )}
    </>
  );
}

export default AdsList;
