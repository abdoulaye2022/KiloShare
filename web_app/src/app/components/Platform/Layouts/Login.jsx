import React from "react";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { Input, Form, Typography, Button, Divider, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Title, Paragraph } = Typography;

const Login = () => {
  const open = useAppSelector((state) => state.modal.isOpenLoginForm);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const t = useTranslations("LoginPage");
  const [defLanguage, setDefLanguage] = useState("fr");
  const [form] = Form.useForm();

  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const cbAdmin = () => {
    router.push("/dashboard");
  };

  const cbUser = () => {
    router.push("/");
  };

  const onFinish = (values) => {
    dispatch(userActions.login(values.phone, values.password, cbUser));
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
    <>
      <Modal
        title={null}
        open={open}
        // onOk={() => dispatch(modalActions.openLoginForm())}
        onCancel={() => dispatch(modalActions.closeLoginForm())}
        footer={null}
        closable={false}
        centered={true}
      >
        <div>
          <div>
            <Title
              level={3}
              style={{
                color: "#4096ff",
                fontWeight: "bold",
                textAlign: "center",
              }}
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
                phone: '',
                password: ''
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
                <Input placeholder="Phone" size="large" />
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
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  size="large"
                >
                  {t("login")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Login;
