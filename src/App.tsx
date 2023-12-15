import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

type Message = {
  id: string;
  content?: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const onTyping = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Enter") {
        setCurrentMessage((prevMessage) => prevMessage + e.key);
      } else if (currentMessage.trim() !== "") {
        const messageId = uuid();

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: messageId,
            content: currentMessage,
          },
        ]);

        setCurrentMessage("");
      }
    },
    [currentMessage]
  );

  useEffect(() => {
    window.addEventListener("keydown", onTyping);

    return () => window.removeEventListener("keydown", onTyping);
  }, [onTyping]);

  return (
    <main className="w-screen h-screen flex items-end">
      <div className="pl-4 pb-16 flex flex-col gap-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className="w-full max-w-fit bg-white rounded-full pl-3 pr-4 py-2 relative"
          >
            <div className="w-6 h-6 bg-white absolute left-0 bottom-0 -z-10 rounded-sm" />
            <span className="font-medium text-base">{message.content}</span>
          </div>
        ))}

        {currentMessage.trim() !== "" && (
          <div className="w-full max-w-fit bg-white rounded-full pl-3 pr-4 py-2 relative">
            <div className="w-6 h-6 bg-white absolute left-0 bottom-0 -z-10 rounded-sm" />
            <span className="font-medium text-base">{currentMessage}</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
