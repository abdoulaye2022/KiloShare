"use client";

import { userActions } from "@/app/lib/redux/actions/users.actions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { Spin, Result } from "antd";
import { useEffect, useState } from "react";

const ConfirmEmail = ({ params }) => {
  const { token } = params;
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const isEmailConfirm = useAppSelector(state => state.user.isEmailConfirm);
  const isEmailAlreadyConfirm = useAppSelector(state => state.user.isEmailAlreadyConfirm);
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(userActions.confirmEmail(token))
    }
  }, [token, dispatch]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="centered-content">
          <Spin size="large" />
          <p>Processing your request...</p>
        </div>
      );
    }

    if (isEmailConfirm && !error) {
      return (
        <Result
          status="success"
          title="Your email address has been successfully confirmed!"
          subTitle="You can now start using your account."
        />
      );
    }

    if (isEmailAlreadyConfirm && !error) {
      return (
        <Result
          status="warning"
          title="Your email address has been already confirmed!"
          subTitle="You can now start using your account."
        />
      );
    }

    if (confirmationStatus === "error" || error) {
      return (
        <Result
          status="error"
          title="Confirmation failed"
          subTitle="Please check the link or try again later."
        />
      );
    }

    return null;
  };

  return (
    <div className="confirmation-container">
      <h1>Email Confirmation</h1>
      {renderContent()}
    </div>
  );
};

export default ConfirmEmail;
