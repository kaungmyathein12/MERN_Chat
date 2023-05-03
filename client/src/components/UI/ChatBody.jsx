import Avatar from "boring-avatars";
import { useEffect, useRef, useState } from "react";

const ChatBody = (messages) => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setCurrentMessages(messages.messages);
  }, [messages]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages]);

  return (
    <div className="flex-1 bg-[#101010] overflow-scroll scrollbar-hide relative">
      <div className="absolute left-0 right-0 bottom-0 pb-24 flex flex-col justify-end">
        {currentMessages &&
          currentMessages.length > 0 &&
          currentMessages.map((msg, index) => {
            return (
              <div key={index} className="px-5 flex flex-row mt-4 mb-2 gap-x-4">
                <div className="w-10 h-10 shrink-0">
                  <Avatar
                    name={msg.sender}
                    variant="marble"
                    colors={[
                      "#5E412F",
                      "#FCEBB6",
                      "#78C0A8",
                      "#F07818",
                      "#F0A830",
                    ]}
                  />
                </div>
                <div>
                  <h1 className="font-semibold text-[15px]">{msg.sender}</h1>
                  <div className="font-medium rounded-md text-[#999] text-sm leading-relaxed">
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })}
        <div ref={lastMessageRef} />
      </div>
    </div>
  );
};

export default ChatBody;
