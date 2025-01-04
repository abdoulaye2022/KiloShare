"use client";

import React from "react";
import { Modal, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const AdApprovalNotice = () => {
  const isAdApprovalNotice = useAppSelector(
    (state) => state.modal.isAdApprovalNotice
  );
  const t = useTranslations("AdNoticePage");
  const router = useRouter();

  const dispatch = useAppDispatch();

  return (
    <Modal
      open={isAdApprovalNotice}
      title={t("adSubmitted")}
      onCancel={() => dispatch(modalActions.closeAdApprovalNotice())}
      footer={[
        <Button
          key="ok"
          type="primary"
          onClick={() => {
            dispatch(modalActions.closeAdApprovalNotice());
            router.replace("/");
          }}
        >
          OK
        </Button>,
      ]}
      centered
    >
      <div style={{ textAlign: "center" }}>
        <CheckCircleOutlined style={{ fontSize: 40, color: "#52c41a" }} />
        <h3 style={{ marginTop: 20 }}>{t("title")}</h3>
        <p>
          {t("description")}
        </p>
      </div>
    </Modal>
  );
};

export default AdApprovalNotice;
