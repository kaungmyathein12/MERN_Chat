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
    const messages = data.messages.map((msg) => ({
      ...msg,
      sender: msg.fromSelf ? currentUser.username : currentChat.username,
    }));
    setSentMessages(messages);
  }, [currentChat, currentUser]);

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
    messages.push({
      fromSelf: true,
      message,
      sender: currentUser.username,
    });

    setSentMessages(messages);
    setMessage("");
  });

  useEffect(() => {
    if (socket) {
      socket.on("received", (data) => {
        setSentMessages((prev) => [
          ...prev,
          {
            fromSelf: false,
            message: data,
            sender: currentChat.username,
          },
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
    <div className="col-span-7 relative flex flex-col">
      <ChatHeader currentChat={currentChat} />
      <ChatBody messages={sentMessages} />
      <ChatInput message={message} setMessage={setMessage} trigger={trigger} />
    </div>
  );
};

export default ChatContainer;
