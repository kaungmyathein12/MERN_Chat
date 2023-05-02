import { useEffect, useRef, useState } from "react";

const ChatBody = (messages) => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setCurrentMessages(messages.messages);
  }, [messages]);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);
  return (
    <div className="flex-1 bg-[#101010] overflow-scroll scrollbar-hide relative">
      <div className="absolute mb-20 left-0 right-0">
        {currentMessages &&
          currentMessages.length > 0 &&
          currentMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-row ${
                msg.fromSelf ? "justify-end" : "justify-start"
              } items-center p-5`}
            >
              <div className="bg-[#333] px-4 py-3 rounded-md text-[15px] max-w-[50%]">
                {msg.message}
              </div>
            </div>
          ))}
        <div ref={lastMessageRef} />
      </div>
    </div>
  );
};

export default ChatBody;