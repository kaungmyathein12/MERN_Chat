import Avatar from "boring-avatars";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

const ChatBody = ({ messages, newMessage }) => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages]);

  useEffect(() => {
    console.log(newMessage);
  }, [newMessage]);

  return (
    <div className="flex-1 h-full relative overflow-hidden overflow-y-scroll">
      <div className="absolute inset-0 h-auto">
        {currentMessages &&
          currentMessages.length > 0 &&
          currentMessages.map((msg, index) => {
            return (
              <div key={index}>
                {newMessage &&
                  Object.keys(newMessage).length > 0 &&
                  newMessage.updatedAt === msg.updatedAt && (
                    <div className="text-center flex flex-row justify-between items-center my-2">
                      <span className="h-[1px] bg-night grow"></span>
                      <span className="border px-4 py-1 rounded-full border-night text-xs">
                        New Messages
                      </span>
                      <span className="h-[1px] bg-night grow"></span>
                    </div>
                  )}
                <div className="px-5 flex flex-row py-4 gap-x-4 hover:bg-[#222]">
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
                    <div className="flex flex-row items-end gap-x-2">
                      <h1 className="font-semibold text-[15px]">
                        {msg.sender}
                      </h1>
                      <span className="text-[12px] mb-[1px] font-medium opacity-50">
                        {moment(msg.updatedAt).format("LT")}
                      </span>
                    </div>
                    <div className="font-medium rounded-md text-[#999] text-sm leading-relaxed">
                      {msg.message}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div ref={lastMessageRef} />
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default ChatBody;
