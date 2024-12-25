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
  Popconfirm,
} from "antd";
import {
  CalendarOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import Image from "next/image";
import { useTranslations } from "next-intl";

const { Text, Title } = Typography;

function AdCard({ ad }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("AdCardPage");

  const user = useAppSelector((state) => state.user.user);

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
    status_id,
    slug,
    user_id,
  } = ad;
  const dispatch = useAppDispatch();

  const formatDate = (date) => dayjs(date).format("D MMM YYYY");

  return (
    <Card
      style={{ minWidth: 310, minHeight: 485 }}
      size="small"
      hoverable
      className="overflow-hidden"
      styles={{
        body: {
          padding: 0,
        },
      }}
      cover={
        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          <Image
            alt={title}
            src={
              photo
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/uploads/images/${photo}`
                : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/img/valise.png`
            }
            fill
            objectFit="cover"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>
      }
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#001529",
          height: 25,
          borderRadius: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
        >{`${space_available} kg available`}</Text>
      </div>
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", padding: 8 }}
      >
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
                  <Text strong>{t("departure")}</Text>
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
                  <Text strong>{t("arrival")}</Text>
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
                  <Text strong>{t("departure")}</Text>
                  <br />
                  <Text type="secondary">{formatDate(departure_date)}</Text>
                </div>
              </Space>
            </Col>
            <Col span={12}>
              <Space size="small">
                <CalendarOutlined style={{ color: "#1890ff" }} />
                <div>
                  <Text strong>{t("arrival")}</Text>
                  <br />
                  <Text type="secondary">{formatDate(arrival_date)}</Text>
                </div>
              </Space>
            </Col>
          </Row>
        </Space>
      </Space>

      <div
        style={{
          paddingTop: 0,
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingBottom: "8px",
        }}
      >
        <Button
          type="primary"
          // icon={<EyeOutlined />}
          block
          size="large"
          style={{ marginTop: 16 }}
          onClick={() => {
            if (user.id === user_id && pathname === "/my-ads") {
              dispatch(adActions.selectedMyAd(id));
            } else if (
              user.profile_id === 1 &&
              pathname.startsWith("/dashboard")
            ) {
              dispatch(adActions.selectedAdminAd());
            } else {
              dispatch(adActions.selectedAd(id));
            }
            router.push(`/ads/${id}/${slug}`);
          }}
        >
          {t("viewDetails")}
        </Button>

        {user.id === user_id &&
        pathname === "/my-ads" &&
        status_id !== 5 &&
        status_id !== 4 ? (
          <Button
            type="default"
            icon={<EditOutlined />}
            block
            size="large"
            style={{
              backgroundColor: "#4ca24c",
              color: "white",
              marginTop: 10,
            }}
            onClick={() => {
              dispatch(adActions.selectedMyAd(id));
              router.push(`/ads/${id}/${slug}/edit`);
            }}
          >
            {t("updateAd")}
          </Button>
        ) : null}

        {status_id !== 5 && status_id !== 4 && pathname === "/my-ads" ? (
          <Popconfirm
            title="Close this ad"
            description="Are you sure you want to close this ad?"
            onConfirm={() => {
              {
                status_id != 5 ? dispatch(adActions.closedAd(id)) : null;
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="default"
              icon={<EditOutlined />}
              block
              size="large"
              disabled={status_id === 5}
              style={{ backgroundColor: "red", color: "white", marginTop: 10 }}
            >
              {t("closed")}
            </Button>
          </Popconfirm>
        ) : null}
      </div>
    </Card>
  );
}

export default AdCard;
