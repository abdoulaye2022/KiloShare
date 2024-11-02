"use client";

import { Input, Form, Typography, Button, Select, Divider, Spin } from "antd";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { setLanguage } from "../../actions/others/setLanguage";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Title, Paragraph } = Typography;

export default function Home() {
  const router = useRouter();
  const t = useTranslations("LoginPage");
  const [defLanguage, setDefLanguage] = useState("fr");
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const cb = () => {
    router.push("/dashboard");
  };

  const onFinish = (values) => {
    dispatch(userActions.login(values.phone, values.password, cb));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // const language = (
    //   navigator.language || navigator.languages[0]
    // ).split("-")[0];

    return () => {
      setDefLanguage("en");
    };
  });

  return (
    <div className={styles.page}>
      <div style={{ marginBottom: 40 }}>
        <Select
          defaultValue={defLanguage}
          onChange={(value) => {
            const language = (
              navigator.language || navigator.languages[0]
            ).split("-")[0];
            setLanguage(value != language ? value : language);
          }}
          options={[
            { value: "en", label: "en" },
            { value: "fr", label: "fr" },
          ]}
          style={{ width: 60 }}
        />
      </div>
      <div className={styles.form_container}>
        <Title
          level={3}
          style={{ color: "#4096ff", fontWeight: "bold", textAlign: "center" }}
        >
          KiloShare
        </Title>
        <Divider
          style={{
            borderColor: "#4096ff",
            margin: 0,
            // marginBottom: 0,
          }}
        >
          <Title level={5} style={{ color: "#4096ff" }}>
            {t("title")}
          </Title>
        </Divider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 6,
            marginBottom: 10,
          }}
        >
          <Spin spinning={loading} />
        </div>

        {error ? (
          <Paragraph style={{ color: "red", marginBottom: 10 }}>
            {error}
          </Paragraph>
        ) : null}
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            style={{ width: "100%" }}
            name="phone"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
              {
                pattern: /^\+?[0-9]{5,15}$/, // Change to match your specific pattern, e.g., 10 digits
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="password"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {t("login")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
