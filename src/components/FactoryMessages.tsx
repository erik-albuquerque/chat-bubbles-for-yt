import React from "react";
import { MessageType } from "../types/Message";
import { Message } from "./Message";

type FactoryMessagesProps = {
  messages: MessageType[];
};

const FactoryMessages: React.FC<FactoryMessagesProps> = ({ messages }) => {
  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </>
  );
};

export { FactoryMessages };
