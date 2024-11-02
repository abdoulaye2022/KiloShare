"use client";
import {
  Modal,
  Input,
  Space,
  Checkbox,
  Form,
  Typography,
  Button,
  Select,
  Divider,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createUser } from "@/app/actions/users/create";

const { Title, Paragraph } = Typography;

function UserForm({ isModalOpen, handleCancel, profiles, success }) {
  const [error, setError] = useState(null);
  const t = useTranslations("LoginPage");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const create = async (
    firstname,
    lastname,
    phone,
    email,
    profile_id,
    password
  ) => {
    try {
      let result = await createUser(
        firstname,
        lastname,
        phone,
        email,
        profile_id,
        password
      );
      if (result.status == 200) {
        setLoading(false);
        success();
        handleCancel();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // console.log(profiles);
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    create(
      values.firstname,
      values.lastname,
      values.phone,
      values.email,
      values.profile_id,
      values.password
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title={
          <>
            <Title level={4} style={{ color: "black", fontWeight: "bold" }}>
              New user
            </Title>
            <Divider />
          </>
        }
        open={isModalOpen}
        onCancel={() => {
          form.resetFields();
          handleCancel();
        }}
        footer={null}
      >
        {error ? <Paragraph style={{ color: "red" }}>{error}</Paragraph> : null}
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Spin spinning={loading} />
        </div>
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
            label="Firstname"
            name="firstname"
            validateTrigger="onBlur"
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
            validateTrigger="onBlur"
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
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Profile"
            name="profile_id"
            rules={[
              {
                required: true,
                message: "Please input profile",
              },
            ]}
          >
            <Select options={profiles} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  handleCancel();
                }}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserForm;
