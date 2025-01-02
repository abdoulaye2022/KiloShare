"use client";

import React, { useEffect, useState } from "react";
import { List, Input, Select, Card, Typography, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { getDateMessageFr } from "../../../utils/utils";
import { useTranslations } from "use-intl";

const { Text } = Typography;

const MessageList = () => {
  const adMessages = useAppSelector((state) => state.ad.adMessages);
  const language = useAppSelector(state => state.preference.language);
  const user = useAppSelector(state => state.user.user);
   const t = useTranslations("MessagePage");

  const dispatch = useAppDispatch();

  useEffect(() => { 
    
   }, []);

  return (
    <>
      <Divider style={{ margin: "10px 0px" }} />
      <Typography.Title level={4}>
        Messages
      </Typography.Title>

      <List
        dataSource={adMessages}
        locale={{
          emptyText: t("noMessages"),
        }}
        renderItem={(msg) => (
          <List.Item>
            <Card
              title={
                <Text strong>
                  {msg.author}{" "} {user.id === msg.user_id ? `(${t("me")})` : null} -{" "}
                  <Text type="secondary">
                    {getDateMessageFr(msg.sending_date, language)}
                  </Text>
                </Text>
              }
              style={{ width: "100%" }}
            >
              <Text>{msg.message}</Text>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default MessageList;
