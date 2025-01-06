"use client";

import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { useTranslations } from "next-intl";

const { Title, Paragraph } = Typography;

const About = () => {
  const t = useTranslations("AboutUsPage");

  return (
    <div style={{ padding: "10px", height: "90vh" }}>
      <Row justify="center" style={{ height: "100%" }}>
        <Col xs={24} sm={22} md={24} lg={24} xl={24}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "24px",
            }}
          >
            <Title
              level={2}
              style={{
                textAlign: "center",
                marginBottom: "24px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {t("title")}
            </Title>

            <Paragraph
              style={{
                fontSize: "16px",
                textAlign: "justify",
                lineHeight: "1.8",
              }}
            >
              {t("description")}
            </Paragraph>

            <Title
              level={3}
              style={{
                marginTop: "24px",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "8px",
              }}
            >
              {t("howItWork")}
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                textAlign: "justify",
                lineHeight: "1.8",
              }}
            >
              {t("howItWorkDescription")}
            </Paragraph>

            <Title
              level={3}
              style={{
                marginTop: "24px",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "8px",
              }}
            >
              {t("whyKiloShare")}
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  styles={{
                    body: {
                      padding: 16,
                    },
                  }}
                >
                  <Title level={4}>{t("economical")}</Title>
                  <Paragraph>{t("sendKilo")}</Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  styles={{
                    body: {
                      padding: 16,
                    },
                  }}
                >
                  <Title level={4}>{t("fast")}</Title>
                  <Paragraph>{t("fastDescription")}</Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  styles={{
                    body: {
                      padding: 16,
                    },
                  }}
                >
                  <Title level={4}>{t("secure")}</Title>
                  <Paragraph>
                    {t("secureDescription")}
                  </Paragraph>
                </Card>
              </Col>
            </Row>

            <Title
              level={3}
              style={{
                marginTop: "24px",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "8px",
              }}
            >
              {t("joinCommunity")}
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                textAlign: "justify",
                lineHeight: "1.8",
              }}
            >
              {t("communityDescription")}
            </Paragraph>

            <Title
              level={3}
              style={{
                marginTop: "24px",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "8px",
              }}
            >
              {t("contact")}
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
              }}
            >
              {t("contactDescription")} :{" "}
              <a href="mailto:contact@kilo-share.com">contact@kilo-share.com</a>
              .
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
