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
  const [form_login] = Form.useForm();

  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const onFinish = (values) => {
    dispatch(userActions.login(values.email, values.password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    return () => {
      setDefLanguage("en");
    };
  });

  return (
    <>
      <Modal
        title={null}
        open={open}
        onCancel={() => {
          dispatch(modalActions.closeLoginForm());
          dispatch(userActions.resetError());
          form_login.resetFields();
        }}
        footer={null}
        closable={false}
        centered={true}
        afterClose={() => {
          form_login.resetFields();
        }}
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
              name="login"
              initialValues={{
                email: "",
                password: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              form={form_login}
            >
              <Form.Item
                style={{ width: "100%" }}
                name="email"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid email",
                  },
                ]}
              >
                <Input placeholder="E-mail" size="large" />
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

              <Form.Item>
                <p>
                  Don't have an account?{" "}
                  <span
                    style={{ color: "#4096ff", fontWeight: "bold", cursor: 'pointer' }}
                    onClick={() => {
                      dispatch(modalActions.closeLoginForm());
                      dispatch(modalActions.openSigninForm());
                      dispatch(userActions.resetError());
                      form_login.resetFields();
                    }}
                  >
                    Sign up
                  </span>
                </p>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Login;
