import React from "react";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { Input, Form, Typography, Button, Divider, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";
import { LockOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ResetPassword = ({ token }) => {
  const open = useAppSelector((state) => state.modal.isOpenResetPassword);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const t = useTranslations("LoginPage");
  const [defLanguage, setDefLanguage] = useState("fr");
  const [form] = Form.useForm();

  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const cb = () => {
    router.replace("/");
  }

  const onFinish = (values) => {
    dispatch(userActions.resetPassword(values.newPassword, token, cb));
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
          dispatch(modalActions.closeResetPassword());
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
                newPassword: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
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
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  size="large"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ResetPassword;
