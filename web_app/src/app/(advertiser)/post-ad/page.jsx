"use client";

import AuthCheck from "@/app/components/Common/AuthCheck";
import AdApprovalNotice from "@/app/components/Platform/Ads/AdApprovalNotice";
import AdsForm from "@/app/components/Platform/Ads/AdsForm";
import { categoryActions } from "@/app/lib/redux/actions/categories.actions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { Spin, Typography } from "antd";
import { useEffect } from "react";

const { Title } = Typography;

function PostAd() {
  const isAdApprovalNotice = useAppSelector(
    (state) => state.modal.isAdApprovalNotice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AdsForm />
        {isAdApprovalNotice ? <AdApprovalNotice /> : null}
      </div>
    </>
  );
}

export default PostAd;
