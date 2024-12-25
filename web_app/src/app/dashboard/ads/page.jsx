"use client";

import AdsDrawer from "@/app/components/Dashboard/Ads/AdsDrawer";
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import { drawerActions } from "@/app/lib/redux/actions/drawers.actions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { getStatusTag } from "@/app/utils/utils";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Divider, Popconfirm, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";

function Ads() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.ad.loading);
  const ads = useAppSelector((state) => state.ad.adminAds);
  const [selectedRow, setSelectedRow] = useState(0);

  useEffect(() => {
    dispatch(adActions.adminAds());
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Space Available",
      dataIndex: "space_available",
      key: "space_available",
    },
    {
      title: "Price Kilo",
      dataIndex: "price_kilo",
      key: "price_kilo",
    },
    {
      title: "Departure date",
      dataIndex: "departure_date",
      key: "departure_date",
    },
    {
      title: "Status",
      dataIndex: "status_name",
      key: "status_name",
      render: (text, record) => {
        return (
          <span>{getStatusTag(record.status_id, record.status_name)}</span>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              // dispatch(userActions.setItem(record.id));
              // dispatch(modalActions.openUserForm());
            }}
            style={{ backgroundColor: "green", color: "white" }}
            icon={<EditOutlined />}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <h3>Ads list</h3>
      <Divider />
      {/* <Button
        type="primary"
        onClick={() => dispatch(drawerActions.openOpenAdsDrawer())}
      >
        <PlusOutlined /> New user
      </Button> */}
      <Spin spinning={loading}>
        <Table
          style={{ marginTop: 10 }}
          size="small"
          dataSource={[
            ...ads.map((p, index) => ({
              key: index + 1,
              id: p.id,
              title: p.title,
              description: p.description,
              space_available: p.space_available,
              price_kilo: p.price_kilo,
              departure_date: p.departure_date,
              status_name: p.status_name,
              status_id: p.status_id,
            })),
          ]}
          onRow={(record, rowIndex) => {
            return {
              style: {
                backgroundColor: record.id === selectedRow ? "#f5f5f5" : null,
                cursor: "pointer",
              },
              onClick: (event) => {
                setSelectedRow(record.id);
                dispatch(adActions.selectedAdminAd(record.id));
                dispatch(drawerActions.openOpenAdsDrawer());
              },
              onMouseOver: () => {
                setSelectedRow(0);
              },
            };
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
          }}
        />
      </Spin>
      {!loading ? <AdsDrawer /> : null}
    </>
  );
}

export default Ads;
