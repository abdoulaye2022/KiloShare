import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Popconfirm,
  Space,
  Tag,
  Typography,
} from "antd";
import { getNames } from "country-list";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { drawerActions } from "@/app/lib/redux/actions/drawers.actions";
import AdsDetail from "@/app/(visitor)/ads/[id]/[slug]/page";
import { adActions } from "@/app/lib/redux/actions/ads.actions";
import { getStatusTag } from "@/app/utils/utils";

const { Text } = Typography;

function AdsDrawer() {
  const [countries, setCountries] = useState([]);
  const open = useAppSelector((state) => state.drawer.isOpenAdsDrawer);
  const dispatch = useAppDispatch();
  const selectedAd = useAppSelector((state) => state.ad.item);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    const countryNames = getNames();
    setCountries(countryNames);
  }, []);

  return (
    <>
      <Drawer
        title=""
        width={750}
        onClose={() => {
          dispatch(drawerActions.closeOpenAdsDrawer());
          setRejected(false)
        }}
        open={open}
        style={{ marginTop: 64 }}
        styles={{
          body: {
            padding: 0,
          },
        }}
        extra={
          <>
            {selectedAd.status_id != 1 ? (
              <>{getStatusTag(selectedAd.status_id, selectedAd.status_name)}</>
            ) : (
              <Space>
                <Popconfirm
                  title="Reject this ad"
                  description="Are you sure you want to reject this ad?"
                  onConfirm={
                    () => {
                      setRejected(true);
                    }
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    style={{
                      color: "red",
                      borderColor: "red",
                      marginRight: 20,
                    }}
                  >
                    <CloseOutlined /> Reject
                  </Button>
                </Popconfirm>

                <Popconfirm
                  title="Approve this ad"
                  description="Are you sure you want to approve this ad?"
                  onConfirm={() => {
                    dispatch(adActions.approve(selectedAd.id));
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={{ color: "green", borderColor: "green" }}>
                    <CheckOutlined /> Approved
                  </Button>
                </Popconfirm>
              </Space>
            )}
          </>
        }
      >
        <AdsDetail rejected={rejected} />
      </Drawer>
    </>
  );
}

export default AdsDrawer;
