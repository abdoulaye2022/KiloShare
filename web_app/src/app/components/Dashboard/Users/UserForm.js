"use client";
import {
  Modal,
  Input,
  Space,
  Form,
  Typography,
  Button,
  Select,
  Divider,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";

const { Title, Paragraph } = Typography;

function UserForm({ success }) {
  const t = useTranslations("UserFormModal");
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.profile.items);
  const error = useAppSelector((state) => state.user.error);
  const isOpenUserForm = useAppSelector((state) => state.modal.isOpenUserForm);
  const loadingUsers = useAppSelector((state) => state.user.loading);
  const item = useAppSelector((state) => state.user.item);

  const onFinish = (values) => {
    if (Object.keys(item).length === 0) {
      dispatch(
        userActions.add(
          values.firstname,
          values.lastname,
          values.phone,
          values.email,
          values.profile_id,
          values.password
        )
      );
      dispatch(modalActions.closeUserForm());
      success();
    } else {
      dispatch(
        userActions.update(
          item.id,
          values.firstname,
          values.lastname,
          values.email,
          values.profile_id
        )
      );
      dispatch(modalActions.closeUserForm());
      success();
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(modalActions.closeUserForm());
    dispatch(userActions.resetItem());
  };

  return (
    <>
      <Modal
        title={
          <>
            <Title level={4} style={{ color: "black", fontWeight: "bold" }}>
              {Object.keys(item).length === 0 ? t("title") : "Update user"}
            </Title>
            <Divider />
          </>
        }
        open={isOpenUserForm}
        onCancel={handleCancel}
        footer={null}
        afterOpenChange={(open) => {
          if (open && item) {
            form.setFieldsValue({
              firstname: item ? item.firstname : "",
              lastname: item ? item.lastname : "",
              phone: item ? item.phone : "",
              email: item ? item.email : "",
              profile_id: item ? item.profile_id : "",
            });
          }
        }}
      >
        {error ? <Paragraph style={{ color: "red" }}>{error}</Paragraph> : null}
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Spin spinning={loadingUsers} />
        </div>
        <Form
          name="basic"
          // initialValues={}
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
            <Input disabled={Object.keys(item).length > 0 ? true : false} />
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
            <Select
              options={[
                ...profiles.map((p) => ({
                  value: p.id,
                  label: <span>{p.name}</span>,
                })),
              ]}
            />
          </Form.Item>

          {Object.keys(item).length === 0 ? (
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
          ) : null}

          <Form.Item>
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>

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
