"use client";

import { Col, Button, Card, Typography, Row } from "antd";

const { Text } = Typography;

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
    collection_date,
    photo
  } = ad;

  return (
    <>
      <Card
        hoverable
        cover={
          <img
            alt={title}
            style={{ height: 250 }}
            src={
              `http://localhost/kiloshare/api/v1/public/uploads/images/${photo}` || "https://via.placeholder.com/300x200?text=No+Image"
            }
          />
        }
      >
        <Text strong>{title}</Text>
        <Text ellipsis style={{ display: "block", marginBottom: 16 }}>
          {description}
        </Text>

        <Row gutter={16}>
          <Col span={12}>
            <Text>Poids : {space_available} kg</Text>
          </Col>
          <Col span={12}>
            <Text>Prix : {price_kilo} €/kg</Text>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Text>
              Départ : {departure_city} le {departure_date}
            </Text>
          </Col>
          <Col span={12}>
            <Text>
              Arrivée : {arrival_city} le {arrival_date}
            </Text>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Text>Collecte : {collection_date}</Text>
          </Col>
        </Row>

        <Button type="primary" style={{ marginTop: 10 }}>
          Voir plus
        </Button>
      </Card>
    </>
  );
}

export default AdCard;
