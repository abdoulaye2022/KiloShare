"use client";

import { Input, Space, Typography, Button, Divider, Spin, Select } from "antd";
import styles from "./page.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "./actions/auth/login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { setLanguage } from "./actions/others/setLanguage";
import { getLanguage } from "./actions/others/getLanguage";

const { Title, Paragraph } = Typography;

export default function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("LoginPage");
  const [defLanguage, setDefLanguage] = useState("fr");

  useEffect(() => {
    // const language = (
    //   navigator.language || navigator.languages[0]
    // ).split("-")[0];

    return () => {
      setDefLanguage("en");
    }
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
        <Formik
          initialValues={{ phone: "", password: "" }}
          validationSchema={Yup.object({
            phone: Yup.string()
              .min(5, "Must be 5 characters long")
              .max(15, "Must be 15 characters or less")
              .matches(/^\+?\d[\d\s-]{5,15}$/, {
                excludeEmptyString: true,
                message: "Invalid phone number format",
              })
              .required("Required"),
            password: Yup.string()
              .min(3, "Must be 6 characters long")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              let result = await login(values.phone, values.password);
              if (result.status == 200) {
                setLoading(false);
                router.push("/dashboard");
              }
            } catch (error) {
              setLoading(false);
              setError(error.message);
            }
          }}
        >
          {(formik) => (
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: "flex",
              }}
            >
              <Title level={3} style={{ color: "#4096ff", fontWeight: "bold" }}>
                KiloShare
              </Title>
              <Divider
                style={{
                  borderColor: "#4096ff",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                <Title level={5} style={{ color: "#4096ff" }}>
                  {t("title")}
                </Title>
              </Divider>
              <Spin spinning={loading} />
              {error ? (
                <Paragraph style={{ color: "red", margin: 0 }}>
                  {error}
                </Paragraph>
              ) : null}
              <Input
                name="phone"
                placeholder="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />

              {formik.errors.phone ? (
                <Paragraph style={{ color: "red", margin: 0 }}>
                  {formik.errors.phone}
                </Paragraph>
              ) : null}

              <Input.Password
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <Paragraph style={{ color: "red", margin: 0 }}>
                  {formik.errors.password}
                </Paragraph>
              ) : null}

              <Button
                type="primary"
                style={{
                  width: "100%",
                  backgroundColor: "#4096ff",
                }}
                onClick={formik.handleSubmit}
              >
                {t("login")}
              </Button>
            </Space>
          )}
        </Formik>
      </div>
    </div>
  );
}
