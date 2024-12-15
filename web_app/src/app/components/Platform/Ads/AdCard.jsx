"use client";

import {
  Col,
  Button,
  Card,
  Typography,
  Row,
  Badge,
  Space,
  Tooltip,
} from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import { useAppDispatch } from "@/app/lib/redux/hooks";

const { Text, Title } = Typography;

function AdCard({ ad }) {
  const {
    id,
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
    slug
  } = ad;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formatDate = (date) => dayjs(date).format("D MMM YYYY");

  return (
    <Card
      style={{ minWidth: 310, minHeight: 485 }}
      size="small"
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
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/uploads/images/${photo}`
                : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/img/valise.png`
            }
          />
          <Badge
            count={`${space_available} kg available`}
            style={{
              position: "absolute",
              right: 0,
              top: 70,
              bottom: 0,
              backgroundColor: "#1890ff",
              color: "#fff",
              fontSize: 18,
              height: 30,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              borderRadius: 0,
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
          <Tooltip title={`${title}`}>
            <Title
              level={4}
              ellipsis={true}
              style={{ margin: 0, fontSize: 16 }}
            >
              {title}
            </Title>
          </Tooltip>
          <Badge
            count={`$${price_kilo}`}
            style={{
              backgroundColor: "#52c41a",
              fontWeight: "bold",
              fontSize: 14,
            }}
          />
        </div>

        <Tooltip title={description}>
          <Text
            type="secondary"
            ellipsis={{ rows: 2 }}
            style={{ marginBottom: 16 }}
          >
            {description}
          </Text>
        </Tooltip>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Space size="small">
                <EnvironmentOutlined style={{ color: "#1890ff" }} />
                <div>
                  <Text strong>Departure</Text>
                  <br />
                  <Tooltip title={`${arrival_city}, ${arrival_country}`}>
                    <Text
                      style={{ width: 120 }}
                      type="secondary"
                      ellipsis={true}
                    >
                      {departure_city}, {departure_country}
                    </Text>
                  </Tooltip>
                </div>
              </Space>
            </Col>
            <Col span={12}>
              <Space size="small">
                <EnvironmentOutlined style={{ color: "#1890ff" }} />
                <div>
                  <Text strong>Arrival</Text>
                  <br />
                  <Tooltip title={`${arrival_city}, ${arrival_country}`}>
                    <Text
                      type="secondary"
                      ellipsis={true}
                      style={{ width: 120 }}
                    >
                      {arrival_city}, {arrival_country}
                    </Text>
                  </Tooltip>
                </div>
              </Space>
            </Col>
          </Row>

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
          onClick={() => {
            dispatch(adActions.selectedAd(id));
            router.push(`/ads/${id}/${slug}`);
          }}
        >
          View details
        </Button>
      </Space>
    </Card>
  );
}

export default AdCard;
