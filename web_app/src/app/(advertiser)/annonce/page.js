"use client";

// AdPage.js
import React from 'react';
import { Layout, Row, Col, Card, Button, Typography, List, Avatar, Carousel, Comment, Form, Input } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const AdPage = () => {
  return (
    <Layout>
      {/* En-tête */}
      <Header style={{ textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white' }}>Détail de l'Annonce</Title>
      </Header>

      {/* Contenu principal */}
      <Content style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
        {/* Image et Informations principales */}
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={12}>
            <Carousel autoplay>
              <div><img src="https://via.placeholder.com/600x400" alt="Main Ad" style={{ width: '100%' }} /></div>
              <div><img src="https://via.placeholder.com/600x400" alt="Secondary Ad" style={{ width: '100%' }} /></div>
            </Carousel>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <Title level={3}>Nom de l'Annonce</Title>
              <Text strong>Lieu : Paris, France</Text><br />
              <Text strong>Catégorie : Électronique</Text><br />
              <Text strong>Prix : 150€</Text>
              <div style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<MessageOutlined />} style={{ marginRight: '10px' }}>Contacter</Button>
                <Button type="default" icon={<MailOutlined />}>Envoyer un message</Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Description de l'annonce */}
        <Row style={{ marginTop: '40px' }}>
          <Col span={24}>
            <Card title="Description de l'Annonce">
              <Text>
                Description détaillée de l'annonce. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Informations sur l'annonceur */}
        <Row style={{ marginTop: '20px' }}>
          <Col xs={24} md={12}>
            <Card title="Informations sur l'Annonceur">
              <Avatar icon={<UserOutlined />} size="large" style={{ marginBottom: '10px' }} />
              <Text><br />Nom : Jean Dupont</Text><br />
              <Text>Email : jeandupont@example.com</Text><br />
              <Text>Téléphone : +33 6 12 34 56 78</Text><br />
              <div style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<PhoneOutlined />}>Appeler</Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Annonces similaires */}
        <Row style={{ marginTop: '40px' }}>
          <Col span={24}>
            <Title level={4}>Annonces Similaires</Title>
            
          </Col>
        </Row>

        {/* Section des avis des utilisateurs */}
        <Row style={{ marginTop: '40px' }}>
          <Col span={24}>
            <Title level={4}>Avis des Utilisateurs</Title>
            
            {/* Formulaire d'ajout de commentaire */}
            <Form layout="vertical" style={{ marginTop: '20px' }}>
              <Form.Item label="Ajouter un avis">
                <Input.TextArea rows={3} placeholder="Votre avis ici..." />
              </Form.Item>
              <Button type="primary">Soumettre</Button>
            </Form>
          </Col>
        </Row>
      </Content>

      {/* Pied de page */}
      <Footer style={{ textAlign: 'center' }}>
        ©2024 Kiloshare. Tous droits réservés.
      </Footer>
    </Layout>
  );
};

export default AdPage;

