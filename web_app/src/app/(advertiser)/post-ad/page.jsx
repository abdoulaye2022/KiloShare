"use client";

import AuthCheck from "@/app/components/Common/AuthCheck";
import AdApprovalNotice from "@/app/components/Platform/Ads/AdApprovalNotice";
import AdsForm from "@/app/components/Platform/Ads/AdsForm";
import { categoryActions } from "@/app/lib/redux/actions/categories.actions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { Col, Row, Spin, Typography } from "antd";
import { useEffect } from "react";

const { Title } = Typography;

function PostAd() {
  const isAdApprovalNotice = useAppSelector(
    (state) => state.modal.isAdApprovalNotice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <>
      <Row>
        <Col md={4} style={{ padding: 10 }}></Col>
        <Col xs={24} sm={24} md={16} style={{ padding: 10 }}>
            <AdsForm />
            {isAdApprovalNotice ? <AdApprovalNotice /> : null}
        </Col>
      </Row>
    </>
  );
}

export default PostAd;
