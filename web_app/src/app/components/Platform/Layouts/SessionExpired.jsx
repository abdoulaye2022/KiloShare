import React from "react";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { Input, Form, Typography, Button, Divider, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Title, Paragraph } = Typography;

const SessionExpired = () => {
  const open = useAppSelector((state) => state.modal.isOpenSessionExpired);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const t = useTranslations("SessionExpiredPage");
  const [defLanguage, setDefLanguage] = useState("fr");

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
        onCancel={null}
        footer={null}
        closable={false}
        centered={true}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
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
                {t("title")}
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
              <Spin spinning={true} />
            </div>
            <Paragraph style={{ color: "orange"}}>{t("textSessionExpired")}</Paragraph>
            <Button type="primary" onClick={() => {
                dispatch(modalActions.closeSessionExpired());
                dispatch(userActions.logout(() => router.replace("/")));
                // dispatch(modalActions.openLoginForm());
            }}>{t("goToHome")}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SessionExpired;
