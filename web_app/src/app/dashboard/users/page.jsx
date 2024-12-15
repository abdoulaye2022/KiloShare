"use client";

import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import {
  Table,
  Typography,
  Button,
  Divider,
  Tag,
  message,
  Spin,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import UserForm from "@/app/components/Dashboard/Users/UserForm";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";
import { profileActions } from "@/app/lib/redux/actions/profiles.actions";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";

const { Title, Paragraph } = Typography;

function Users() {
  const dispatch = useAppDispatch();
  const usersStore = useAppSelector((state) => state.user.items);
  const loadingUsers = useAppSelector((state) => state.user.loading);
  const loadingProfile = useAppSelector((state) => state.profile.loading);
  const user = useAppSelector((state) => state.user.user);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const showModal = () => {
    dispatch(modalActions.openUserForm());
  };

  const confirm = (msg, cb) => {
    cb();
    message.success(msg);
  };

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          {record.status == 1 ? (
            <Tag color="green">ACTIF</Tag>
          ) : (
            <Tag color="red">INACTIF</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button icon={<EyeOutlined />} />{" "}
          <Button
            onClick={() => {
              dispatch(userActions.setItem(record.id));
              dispatch(modalActions.openUserForm());
            }}
            style={{ backgroundColor: "green", color: "white" }}
            icon={<EditOutlined />}
          />{" "}
          {record.status ? (
            <Popconfirm
              title="Suspend the user"
              description="Are you sure you want to suspend this user?"
              onConfirm={() =>
                confirm("User suspend successfully.", () =>
                  dispatch(userActions.suspend(record.id))
                )
              }
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<LockOutlined />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Unsuspend the user"
              description="Are you sure you want to unsuspend this user?"
              onConfirm={() =>
                confirm("User unsuspend successfully.", () =>
                  dispatch(userActions.unsuspend(record.id))
                )
              }
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ backgroundColor: "orange" }}
                icon={<UnlockOutlined />}
              />
            </Popconfirm>
          )}{" "}
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() =>
              confirm("User deleted successfully.", () =>
                dispatch(userActions.remove(id))
              )
            }
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={user.id === record.id ? true : false}
              style={{ backgroundColor: "red", color: "white" }}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>{" "}
        </>
      ),
    },
  ];

  useEffect(() => {
    // dispatch(profileActions.getAll());
    dispatch(userActions.getAll());
  }, []);
  return (
    <>
      {contextHolder}
      <h3>User list</h3>
      <Divider />
      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> New user
      </Button>
      <Spin spinning={loadingUsers}>
        <Table
          style={{ marginTop: 10 }}
          size="small"
          dataSource={[
            ...usersStore.map((p, index) => ({
              key: index + 1,
              id: p.id,
              firstname: p.firstname,
              lastname: p.lastname,
              phone: p.phone,
              email: p.email,
              profile: p.profile_name,
              status: p.status,
            })),
          ]}
          columns={columns}
          pagination={{
            pageSize: 10,
          }}
        />
      </Spin>
      {!loadingProfile ? <UserForm success={success} /> : null}
    </>
  );
}

export default Users;
