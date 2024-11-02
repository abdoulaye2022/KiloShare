"use client";

import { getAllUsers } from "../../actions/users/getAll";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Table, Typography, Button, Divider, Tag, message, Spin } from "antd";
import { useEffect, useState } from "react";
import UserForm from "@/app/components/modals/UserForm";
import { getAllProfile } from "../../actions/profiles/getAll";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Title, Paragraph } = Typography;

function Users() {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const dispatch = useAppDispatch();
  const usersStore = useAppSelector((state) => state.user.items);
  const loadingUsers = useAppSelector((state) => state.user.loading);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getProfile = async () => {
    try {
      let result = await getAllProfile();
      if (result.status == 200) {
        setProfiles([
          ...result.data.map((p) => ({
            value: p.id,
            label: <span>{p.name}</span>,
          })),
        ]);
      }
    } catch (error) {
      console.log(error);
      // setError(error.message);
    }
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
          {record.active == 1 ? (
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
            onClick={() => console.log(record)}
            style={{ backgroundColor: "green", color: "white" }}
            icon={<EditOutlined />}
          />{" "}
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            icon={<DeleteOutlined />}
          />{" "}
        </>
      ),
    },
  ];

  useEffect(() => {
    // getUsers();
    // getProfile();
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
          size="small"
          dataSource={[
            ...usersStore.map((p, index) => ({
              key: index + 1,
              firstname: p.firstname,
              lastname: p.lastname,
              phone: p.phone,
              email: p.email,
              profile: p.profile_id,
              active: p.active,
            })),
          ]}
          columns={columns}
          pagination={{
            pageSize: 10,
          }}
        />
      </Spin>
      <UserForm
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        profiles={profiles}
        success={success}
      />
    </>
  );
}

export default Users;
