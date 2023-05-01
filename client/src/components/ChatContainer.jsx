import { useCallback, useEffect, useState } from "react";
import ChatHeader from "./UI/ChatHeader";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import useSWRMutation from "swr/mutation";
import api from "../api";
import { socket } from "../socket";
const ChatContainer = ({ currentChat, currentUser }) => {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const getAllMessages = useCallback(async () => {
    const { data } = await api.post("/messages/getmsg", {
      from: currentUser._id,
      to: currentChat._id,
    });
    setSentMessages(data.messages);
  }, [currentChat._id, currentUser._id]);

  const { trigger } = useSWRMutation("/messages/addmsg", async (url) => {
    await api.post(url, {
      from: currentUser._id,
      to: currentChat._id,
      message,
    });
    socket.emit("sendMessage", {
      to: currentChat._id,
      message,
    });

    const messages = [...sentMessages];
    messages.push({ fromSelf: true, message });
    setSentMessages(messages);
    setMessage("");
  });

  useEffect(() => {
    if (socket) {
      socket.on("received", (data) => {
        setSentMessages((prev) => [
          ...prev,
          { fromSelf: false, message: data },
        ]);
      });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.emit("connected", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentChat._id) {
      getAllMessages();
    }
  }, [currentChat, getAllMessages]);
  return (
    <div className="col-span-6 border-r border-night relative flex flex-col">
      <ChatHeader currentChat={currentChat} />
      <div className="flex-1 bg-[#101010] overflow-scroll relative">
        <div className="absolute overflow-scroll pb-20">
          {sentMessages &&
            sentMessages.length > 0 &&
            sentMessages.map((msg, index) => (
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
        </div>
      </div>
      <div className="bg-[#101010] border-t border-night absolute bottom-0 w-full p-3 flex flex-row justify-between items-stretch gap-x-4">
        <textarea
          rows="1"
          placeholder="Enter text something"
          autoFocus
          className="outline-none bg-[#101010] resize-none p-3 w-full mx-0 text-sm rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="border border-night px-4 rounded-md bg-white text-black"
          onClick={() => trigger()}
        >
          <PaperPlaneTilt size={18} weight="fill" />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
