"use client";

import { Col, Button, Empty, Typography } from "antd";
import AdCard from "../Ads/AdCard";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { usePathname } from "next/navigation";

function AdsList() {
  const ads = useAppSelector((state) => state.ad.items);
  const userAds = useAppSelector((state) => state.ad.userAds);
  const filteredItems = useAppSelector((state) => state.ad.filteredItems);
  const isFiltered = useAppSelector((state) => state.ad.isFiltered);
  const pathname = usePathname();

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
          <div
            style={{
              minHeight: "calc(100vh - 235px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )
      ) : userAds && pathname === "/my-ads" ? (
        userAds.map((uAd, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <AdCard ad={uAd} />
          </Col>
        ))
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
