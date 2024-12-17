"use client";

import React, { useState } from "react";
import { Card, Avatar, Button, Input, Form, message, Tabs, Row, Col } from "antd";
import {
  UserOutlined,
  EditOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { TabPane } = Tabs;

function MyProfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleSubmitProfile = (values) => {
    dispatch(
      userActions.updateUserProfil(
        values.firstname,
        values.lastname,
        values.phone
      )
    );
    setIsEditing(false);
    // message.success("Profile updated successfully");
  };

  const handleSubmitPassword = (values) => {
    dispatch(
      userActions.changePassword(values.oldPassword, values.newPassword)
    );
  };

  return (
    <Row>
      <Col md={4} style={{ padding: 10 }}></Col>
      <Col xs={24} sm={24} md={16} style={{ padding: 10 }}>
        <div style={{ margin: "0 auto" }}>
          <Card
            title="My Profil"
            extra={
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Annuler" : "Modifier"}
              </Button>
            }
            bordered={false}
            style={{ width: "100%" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Avatar size={64} icon={<UserOutlined />} />
              <div style={{ marginLeft: "20px" }}>
                <h3>{`${user.firstname} ${user.lastname}`}</h3>
              </div>
            </div>

            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="About" key="1">
                {isEditing ? (
                  <Form
                    form={form}
                    initialValues={{
                      firstname: user.firstname,
                      lastname: user.lastname,
                      phone: user.phone,
                    }}
                    onFinish={handleSubmitProfile}
                    layout="vertical"
                  >
                    <Form.Item
                      label="Firstname"
                      name="firstname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your firstname!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Lastname"
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your lastname!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                        {
                          pattern: /^\+?[0-9]{5,15}$/,
                          message: "Please enter a valid 10-digit phone number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Sauvegarder
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <div>
                    <p>
                      <strong>
                        <PhoneOutlined />
                      </strong>
                      &nbsp;&nbsp;&nbsp;{user.phone}
                    </p>
                    <p>
                      <strong>
                        <MailOutlined />
                      </strong>
                      &nbsp;&nbsp;&nbsp;{user.email}
                    </p>
                  </div>
                )}
              </Tabs.TabPane>

              <Tabs.TabPane tab="Change Password" key="2">
                <Form onFinish={handleSubmitPassword} layout="vertical">
                  <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[
                      { required: true, message: "Old password is required!" },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      { required: true, message: "New password is required!" },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>

                  <Form.Item
                    label="Confirm New Password"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Passwords do not match!");
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update Password
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Préférences" key="3">
                <div>
                  {/* <h4>Notifications</h4>
              <p>Paramètres de notification: Activer/Désactiver</p> */}
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

export default MyProfil;
