"use client";

import { userActions } from "@/app/lib/redux/actions/users.actions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { Spin, Result } from "antd";
import { useEffect } from "react";

const ConfirmEmailPage = ({ params }) => {
  const { token } = params;
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const isEmailConfirm = useAppSelector((state) => state.user.isEmailConfirm);
  const lastVerifiedEmailTime = useAppSelector(state => state.user.lastVerifiedEmailTime);

  useEffect(() => {
    if (token && !isEmailConfirm) {
      dispatch(userActions.confirmEmail(token));
    }
  }, [token, dispatch, isEmailConfirm]);

  return (
    <div className="confirmation-container">
      <h1>Email Confirmation</h1>
      {loading ? (
        <div className="centered-content">
          <Spin size="large" spinning={loading} />
          <p>Processing your request...</p>
        </div>
      ) : isEmailConfirm === true ? (
        <Result
          status="success"
          title="Your email address has been successfully confirmed!"
          subTitle="You can now start using your account."
        />
      ) : !isEmailConfirm && error === "" ? (
        <Result
          status="warning"
          title="Your email address has been already confirmed!"
          subTitle="You can now start using your account."
        />
      ) : (
        <Result
          status="error"
          title="Confirmation failed"
          subTitle="Please check the link or try again later."
        />
      )}
    </div>
  );
};

export default ConfirmEmailPage;
