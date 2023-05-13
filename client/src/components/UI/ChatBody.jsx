import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import moment from "moment";
import { userAtom } from "../../states";

const ChatBody = ({ currentChat, messages }) => {
  const user = useRecoilValue(userAtom);
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
  return (
    <div className="flex-1 h-full relative overflow-hidden overflow-y-scroll">
      <div className="absolute inset-0 h-auto pt-4">
        {currentMessages &&
          currentMessages.length > 0 &&
          currentMessages.map((msg, index) => {
            return (
              <div key={index}>
                <div className="px-5 flex flex-row py-2 gap-x-4 hover:bg-[#222]">
                  <div className="w-10 h-10 shrink-0 rounded overflow-hidden">
                    <img
                      src={
                        msg.sender !== user.username
                          ? currentChat.image
                          : user.image
                      }
                      className="w-full h-full object-cover"
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
