import React from "react";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { Input, Form, Typography, Button, Divider, Spin, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";
import { LockOutlined } from "@ant-design/icons";
import FilterAd from "./FilterAd";

const { Title, Paragraph } = Typography;

const MobileFilterAds = ({ token }) => {
  const open = useAppSelector((state) => state.modal.isOpenMobileFilterAds);
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        title={null}
        open={open}
        onCancel={() => {
          dispatch(modalActions.closeMobileFilterAds());
          dispatch(userActions.resetError());
        }}
        footer={null}
        closable={false}
        centered={true}
        afterClose={() => {
        }}
        style={{ top: 50 }}
      >
        <FilterAd />
      </Modal>
    </>
  );
};
export default MobileFilterAds;
