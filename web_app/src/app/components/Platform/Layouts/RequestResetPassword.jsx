import React from "react";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { Input, Form, Typography, Button, Divider, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Title, Paragraph } = Typography;

const RequestResetPassword = () => {
  const open = useAppSelector((state) => state.modal.isOpenRequestResetPassword);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const t = useTranslations("LoginPage");
  const [defLanguage, setDefLanguage] = useState("fr");
  const [form] = Form.useForm();

  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const onFinish = (values) => {
    dispatch(userActions.requestResetPassword(values.email));
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
          dispatch(modalActions.closeRequestResetPassword());
          dispatch(userActions.resetError());
          form.resetFields();
        }}
        footer={null}
        closable={false}
        centered={true}
        afterClose={() => {
          form.resetFields();
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
              Kilo-Share
            </Title>
            <Divider
              style={{
                borderColor: "#4096ff",
                margin: 0,
                // marginBottom: 0,
              }}
            >
              <Title level={5} style={{ color: "#4096ff" }}>
              Password Reset Portal
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
              form={form}
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

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  size="large"
                >
                  Send password reset link
                </Button>
              </Form.Item>

              <Form.Item>
                <p>
                  Already have an account?{" "}
                  <span
                    style={{
                      color: "#4096ff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(modalActions.closeRequestResetPassword());
                      dispatch(modalActions.openLoginForm());
                      dispatch(userActions.resetError());
                      form.resetFields();
                    }}
                  >
                    Log in
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
export default RequestResetPassword;