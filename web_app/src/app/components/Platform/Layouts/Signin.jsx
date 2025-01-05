import React from "react";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { Input, Form, Typography, Button, Divider, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Title, Paragraph } = Typography;

const Signin = () => {
  const open = useAppSelector((state) => state.modal.isOpenSigninForm);
  const dispatch = useAppDispatch();
  const t = useTranslations("SignInPage");

  const router = useRouter();
  const [defLanguage, setDefLanguage] = useState("fr");
  const [form] = Form.useForm();

  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const cbUser = () => {
    router.push("/");
  };

  const onFinish = (values) => {
    dispatch(
      userActions.signin(
        values.firstname,
        values.lastname,
        values.email,
        values.password
      )
    );
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
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
          dispatch(modalActions.closeSigninForm());
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
              name="signin"
              initialValues={{
                firstname: "",
                lastname: "",
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
                name="firstname"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: t("firstnameRequired"),
                  },
                ]}
              >
                <Input placeholder={t("firstname")} size="large" />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                name="lastname"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: t("lastnameRequired"),
                  },
                ]}
              >
                <Input placeholder={t("lastname")} size="large" />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                name="email"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: t("emailRequired"),
                  },
                  {
                    type: "email",
                    message: t("emailInvalid"),
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
                    message: t("passwordRequired"),
                  },
                ]}
              >
                <Input.Password placeholder={t("password")} size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: t("valideConfirmPassword") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Passwords do not match!");
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={t("confirmPassword")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  size="large"
                >
                  {t("signUp")}
                </Button>
              </Form.Item>

              <Form.Item>
                <p>
                  {t("alreadyHaveAnAccount")}{" "}
                  <span
                    style={{
                      color: "#4096ff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(modalActions.closeSigninForm());
                      dispatch(modalActions.openLoginForm());
                      dispatch(userActions.resetError());
                      form.resetFields();
                    }}
                  >
                    {t("login")}
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
export default Signin;
