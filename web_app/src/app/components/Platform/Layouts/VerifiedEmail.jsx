import React from "react";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { Input, Form, Typography, Button, Divider, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { userActions } from "@/app/lib/redux/actions/users.actions";

const { Title, Paragraph } = Typography;

const VerifiedEmail = () => {
  const open = useAppSelector((state) => state.modal.isOpenVerifiedEmail);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        title={null}
        open={open}
        onCancel={() => {
          dispatch(modalActions.closeVerifiedEmail());
        }}
        footer={null}
        closable={false}
        centered={true}
      >
        <div>
          <div>
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
                Email verification
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
              {/* <Spin spinning={loading} /> */}
            </div>
            <Paragraph>
              Please verify your email address first.{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "#4096ff",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(userActions.verifiedEmail(user.email))}
              >
                Click here
              </span>{" "}
              to resend the verification link.
            </Paragraph>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default VerifiedEmail;
