import { useCallback, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { socket } from "../socket";
import api from "../api";
import ChatBody from "./UI/ChatBody";
import ChatInput from "./UI/ChatInput";
import ChatHeader from "./UI/ChatHeader";

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
      <ChatBody messages={sentMessages} />
      <ChatInput message={message} setMessage={setMessage} trigger={trigger} />
    </div>
  );
};

export default ChatContainer;
