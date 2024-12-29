"use client";

import React, { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Input,
  Form,
  message,
  Tabs,
  Row,
  Col,
  Spin,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";
import { useTranslations } from "next-intl";
import { preferenceActions } from "@/app/lib/redux/actions/preferences.actions";

const { TabPane } = Tabs;

function MyProfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [formPassword] = Form.useForm();
  const user = useAppSelector((state) => state.user.user);
  const authenticated = useAppSelector((state) => state.user.authenticated);
  const loading = useAppSelector((state) => state.user.loading);
  const preference = useAppSelector((state) => state.preference.item);
  const t = useTranslations("MyprofilPage");
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

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleSubmitPassword = (values) => {
    dispatch(
      userActions.changePassword(values.oldPassword, values.newPassword)
    );
    formPassword.resetFields();
  };

  return (
    <Row>
      <Col md={4} style={{ padding: 10 }}></Col>
      <Col xs={24} sm={24} md={16} style={{ padding: 10 }}>
        <div style={{ margin: "0 auto" }}>
          <Card
            title={t("title")}
            extra={
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? t("cancel") : t("update")}
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
              <Avatar
                size="large"
                icon={authenticated ? null : <UserOutlined />}
                style={{ color: "white", backgroundColor: "#1677ff" }}
              >
                {authenticated
                  ? `${user.firstname[0]}.${user.lastname[0]}`
                  : null}
              </Avatar>
              <div style={{ marginLeft: "20px" }}>
                <h3>{`${user.firstname} ${user.lastname}`}</h3>
              </div>
            </div>

            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={t("about")} key="1">
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
                          message: t("firstnameRequired"),
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Lastname"
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          message: t("lastnameRequired"),
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: t("phoneRequired"),
                        },
                        {
                          pattern: /^\+?[0-9]{5,15}$/,
                          message: t("phoneValid"),
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" size="large" htmlType="submit">
                        {t("updateButton")}
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

              <Tabs.TabPane tab={t("changePassword")} key="2">
                <Spin spinning={loading}>
                  <Form
                    onFinish={handleSubmitPassword}
                    layout="vertical"
                    form={formPassword}
                  >
                    <Form.Item
                      label={t("oldPassword")}
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: t("oldPasswordRequired"),
                        },
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item
                      label={t("newPassword")}
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: t("newPasswordRequired"),
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("oldPassword") !== value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(t("oldDifferentNewPassword"));
                          },
                        }),
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item
                      label={t("confirmPassword")}
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        {
                          required: true,
                          message: t("confirmPasswordRequired"),
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(t("passwordNotMatch"));
                          },
                        }),
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        {t("updateButton")}
                      </Button>
                    </Form.Item>
                  </Form>
                </Spin>
              </Tabs.TabPane>

              <Tabs.TabPane tab={t("preferences")} key="3">
                <div style={{ padding: "20px" }}>
                  <h4 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Préférences sur l'annonce
                  </h4>

                  <div style={{ marginBottom: "20px", display: "flex" }}>
                    <p style={{ marginBottom: "5px" }}>Afficher le nom et le prénom</p>
                    <Checkbox checked={preference.fullname === 1} onChange={(e) => {
                        if (e.target.checked)
                          dispatch(preferenceActions.update("fullname", 1));
                        else dispatch(preferenceActions.update("fullname", 0));
                      }} style={{ marginLeft: 10 }} />
                  </div>

                  <div style={{ marginBottom: "10px", display: "flex" }}>
                    <p style={{ marginBottom: "5px" }}>
                      Afficher le numéro de téléphone
                    </p>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked)
                          dispatch(preferenceActions.update("phone", 1));
                        else dispatch(preferenceActions.update("phone", 0));
                      }}
                      style={{ marginLeft: 10 }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px", display: "flex" }}>
                    <p style={{ marginBottom: "5px" }}>Afficher l'email</p>
                    <Checkbox onChange={(e) => {
                        if (e.target.checked)
                          dispatch(preferenceActions.update("email", 1));
                        else dispatch(preferenceActions.update("email", 0));
                      }} style={{ marginLeft: 10 }} />
                  </div>

                  <h4 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Préférences de notification
                  </h4>

                  <div style={{ display: "flex" }}>
                    <p style={{ marginBottom: "5px" }}>
                      Recevoir des notifications par email pour les nouvelles
                      annonces
                    </p>
                    <Checkbox onChange={(e) => {
                        if (e.target.checked)
                          dispatch(preferenceActions.update("newsletter", 1));
                        else dispatch(preferenceActions.update("newsletter", 0));
                      }} style={{ marginLeft: 10 }} />
                  </div>
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
