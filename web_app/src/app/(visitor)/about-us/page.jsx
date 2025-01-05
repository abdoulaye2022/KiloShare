"use client"

import React from "react";
import { Card, Typography, Row, Col, Image } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: "5px 5px" }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card>
            <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
              À propos de Kilo-Share
            </Title>

            <Paragraph style={{ fontSize: "16px", textAlign: "justify" }}>
              Kilo-Share est une plateforme innovante qui permet aux utilisateurs de partager, échanger et découvrir des annonces dans divers domaines tels que l'électronique, les vêtements, les documents, la nourriture, et bien plus encore. Notre mission est de faciliter les échanges entre les membres de la communauté tout en promouvant une économie collaborative et durable.
            </Paragraph>

            <Title level={3} style={{ marginTop: "24px" }}>
              Notre Vision
            </Title>
            <Paragraph style={{ fontSize: "16px", textAlign: "justify" }}>
              Nous croyons en un monde où chacun peut partager ses ressources et bénéficier de celles des autres. Kilo-Share vise à créer une communauté solidaire où les utilisateurs peuvent facilement trouver ce dont ils ont besoin et offrir ce qu'ils n'utilisent plus.
            </Paragraph>

            <Title level={3} style={{ marginTop: "24px" }}>
              Fonctionnalités Clés
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable>
                  <Title level={4}>Annonces Faciles</Title>
                  <Paragraph>
                    Publiez et gérez vos annonces en quelques clics seulement.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable>
                  <Title level={4}>Recherche Avancée</Title>
                  <Paragraph>
                    Trouvez rapidement ce que vous cherchez grâce à nos filtres intelligents.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable>
                  <Title level={4}>Sécurité</Title>
                  <Paragraph>
                    Nous garantissons la sécurité de vos données et transactions.
                  </Paragraph>
                </Card>
              </Col>
            </Row>

            {/* <Title level={3} style={{ marginTop: "24px" }}>
              Notre Équipe
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable>
                  <Image
                    src="https://via.placeholder.com/150" // Remplacez par une image de votre équipe
                    alt="Membre de l'équipe"
                    style={{ borderRadius: "8px" }}
                  />
                  <Title level={4} style={{ marginTop: "16px" }}>
                    John Doe
                  </Title>
                  <Paragraph>Développeur Full-Stack</Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable>
                  <Image
                    src="https://via.placeholder.com/150" // Remplacez par une image de votre équipe
                    alt="Membre de l'équipe"
                    style={{ borderRadius: "8px" }}
                  />
                  <Title level={4} style={{ marginTop: "16px" }}>
                    Jane Smith
                  </Title>
                  <Paragraph>Designer UI/UX</Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable>
                  <Image
                    src="https://via.placeholder.com/150" // Remplacez par une image de votre équipe
                    alt="Membre de l'équipe"
                    style={{ borderRadius: "8px" }}
                  />
                  <Title level={4} style={{ marginTop: "16px" }}>
                    Alex Johnson
                  </Title>
                  <Paragraph>Responsable Marketing</Paragraph>
                </Card>
              </Col>
            </Row> */}

            <Title level={3} style={{ marginTop: "24px" }}>
              Contactez-Nous
            </Title>
            <Paragraph style={{ fontSize: "16px" }}>
              Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter à l'adresse suivante :{" "}
              <a href="mailto:contact@kilo-share.com">contact@kilo-share.com</a>.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;