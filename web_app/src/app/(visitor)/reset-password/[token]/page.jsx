"use client"

import ResetPassword from "@/app/components/Platform/Layouts/ResetPassword";
import { modalActions } from "@/app/lib/redux/actions/modals.actions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { Spin } from "antd";
import { useEffect } from "react";

function ResetPasswordPage({ params }) {
  const { token } = params;
  const dispatch = useAppDispatch();
  const open = useAppSelector(state => state.modal.isOpenResetPassword);

  useEffect(() => {
    dispatch(modalActions.openResetPassword());
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Reset Your Password
      </h1>
      <div
        className="centered-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
      <p style={{ textAlign: "center", fontSize: "16px", color: "#666" }}>
        Please wait while we process your request to reset your password.
      </p>
      {open && <ResetPassword token={token} />}
    </>
  );
}

export default ResetPasswordPage;
