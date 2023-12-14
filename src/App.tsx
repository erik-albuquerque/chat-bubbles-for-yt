import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

type Message = {
  id: string;
  content?: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>({ id: "", content: "" });

  const onTyping = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Enter") {
        setMessage((prevMessage) => ({
          id: uuid(),
          content: prevMessage.content + e.key,
        }));

      } else if (message.content?.trim() !== "") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: uuid(),
            content: message.content,
          },
        ]);

        setMessage({ id: "", content: "" });
      }
    },
    [message.content]
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
      </div>
    </main>
  );
}

export default App;
