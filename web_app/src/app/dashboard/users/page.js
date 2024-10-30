"use client";

import { getAll } from "@/app/actions/users/getAll";
import { Table } from "antd";
import { useEffect, useState } from "react";

const dataSource = [
  {
    key: "1",
    firstname: "Mike",
    lastname: "Dean",
    phone: "5068506548",
    email: "mike@gmail.com",
    profile: "Admin",
    status: "Active",
    action: "10 Downing Street",
  },
];

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
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

function Users() {
  const [users, setUsers] = useState([]);
  const getStatus = async () => {
    try {
      let result = await getAll();
      if (result.status == 200) {
        setUsers([...
          result.data.map((p, index) => ({
            key: index + 1,
            firstname: p.firstname,
            lastname: p.lastname,
            phone: p.phone,
            email: p.email,
            profile: p.profile,
            status: p.active,
            action: "Edit",
          }))
        ]);
      }
    } catch (error) {
      console.log(error);
      // setError(error.message);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);
  return (
    <>
      <h3>User list</h3>
      <Table dataSource={users} columns={columns} />;
    </>
  );
}

export default Users;
