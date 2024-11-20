"use client";

import { Col, Button, Card, Typography } from "antd";
import AdCard from "../Ads/AdCard";
import { useAppSelector } from "@/app/lib/redux/hooks";

const { Text } = Typography;

function AdsList() {
  const ads = useAppSelector((state) => state.ad.items);

  return (
    <>
      {ads.map((ad, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <AdCard ad={ad} />
        </Col>
      ))}
    </>
  );
}

export default AdsList;
