"use client";

import {
  Col,
  Button,
  Card,
  Typography,
  Row,
  Badge,
  Space,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Title } = Typography;

function AdCard({ ad }) {
  const {
    title,
    description,
    space_available,
    price_kilo,
    departure_country,
    arrival_country,
    departure_city,
    arrival_city,
    departure_date,
    arrival_date,
    photo,
  } = ad;

  const formatDate = (date) => dayjs(date).format("D MMM YYYY");

  return (
    <Card
      hoverable
      className="overflow-hidden"
      cover={
        <div style={{ position: "relative" }}>
          <img
            alt={title}
            style={{
              height: 200,
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            src={
              photo
                ? `http://m2acode.com/api/v1/public/uploads/images/${photo}`
                : "https://images.unsplash.com/photo-1519397652863-aad621636ac7?q=80&w=800&auto=format&fit=crop"
            }
          />
          <Badge
            count={`${space_available} kg available`}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              backgroundColor: "#1890ff",
              color: "#fff",
              fontSize: 18,
              height: 30,
              textAlign: "center",
              display: "flex",
              alignItems: "center"
            }}
          />
        </div>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Title level={4} style={{ margin: 0, fontSize: 16 }}>
            {title}
          </Title>
          <Badge
            count={`${price_kilo}€/kg`}
            style={{
              backgroundColor: "#52c41a",
              fontWeight: "bold",
              fontSize: 14,
            }}
          />
        </div>

        <Text
          type="secondary"
          ellipsis={{ rows: 2 }}
          style={{ marginBottom: 16 }}
        >
          {description}
        </Text>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Space
              split={<Divider type="vertical" />}
              style={{ width: "100%" }}
            >
              <div>
                <EnvironmentOutlined style={{ color: "#1890ff" }} />&nbsp;
                <Text strong>Departure</Text>
                <br />
                <Text type="secondary">
                  {departure_city}, {departure_country}
                </Text>
              </div>
              <div>
                <EnvironmentOutlined style={{ color: "#1890ff" }} />&nbsp;
                <Text strong>Arrival</Text>
                <br />
                <Text type="secondary">
                  {arrival_city}, {arrival_country}
                </Text>
              </div>
            </Space>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <Space size="small">
                <CalendarOutlined style={{ color: "#1890ff" }} />
                <div>
                  <Text strong>Departure</Text>
                  <br />
                  <Text type="secondary">{formatDate(departure_date)}</Text>
                </div>
              </Space>
            </Col>
            <Col span={12}>
              <Space size="small">
                <CalendarOutlined style={{ color: "#1890ff" }} />
                <div>
                  <Text strong>Arrival</Text>
                  <br />
                  <Text type="secondary">{formatDate(arrival_date)}</Text>
                </div>
              </Space>
            </Col>
          </Row>
        </Space>

        <Button
          type="primary"
          icon={<EyeOutlined />}
          block
          size="large"
          style={{ marginTop: 16 }}
        >
          View details
        </Button>
      </Space>
    </Card>
  );
}

export default AdCard;
