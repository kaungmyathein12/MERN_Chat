import { useCallback, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { socket } from "../socket";
import { useRecoilValue } from "recoil";
import { userAtom } from "./../states";
import api from "../api";
import ChatBody from "./UI/ChatBody";
import ChatInput from "./UI/ChatInput";
import ChatHeader from "./UI/ChatHeader";

const ChatContainer = ({ currentChat }) => {
  const user = useRecoilValue(userAtom);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(undefined);

  const getAllMessages = useCallback(async () => {
    const { data } = await api.post("/messages/getmsg", {
      from: user._id,
      to: currentChat._id,
    });
    const messages = data.messages.map((msg) => ({
      ...msg,
      sender: msg.fromSelf ? user.username : currentChat.username,
    }));

    setSentMessages(messages);
  }, [currentChat, user]);

  const { trigger } = useSWRMutation("/messages/addmsg", async (url) => {
    const { data } = await api.post(url, {
      from: user._id,
      to: currentChat._id,
      message,
    });

    socket.emit("sendMessage", {
      to: currentChat._id,
      message: data.message.message,
      updatedAt: data.message.updatedAt,
    });

    const messages = [...sentMessages];
    messages.push({
      fromSelf: true,
      sender: user.username,
      message: data.message.message,
      updatedAt: data.message.updatedAt,
    });
    if (newMessage === undefined) {
      setNewMessage({
        fromSelf: true,
        sender: user.username,
        message: data.message.message,
        updatedAt: data.message.updatedAt,
      });
    }

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
            sender: currentChat.username,
            message: data.message,
            updatedAt: data.updatedAt,
          },
        ]);
        if (newMessage === undefined) {
          setNewMessage({
            fromSelf: false,
            sender: currentChat.username,
            message: data.message,
            updatedAt: data.updatedAt,
          });
        }
      });
    }
  }, [currentChat]);

  useEffect(() => {
    if (user) {
      socket.emit("connected", user._id);
    }
  }, [user]);

  useEffect(() => {
    if (currentChat._id) {
      getAllMessages();
    }
  }, [currentChat, getAllMessages]);

  return (
    <div className="flex-grow relative flex flex-col border-r border-night">
      <ChatHeader currentChat={currentChat} />
      <ChatBody messages={sentMessages} newMessage={newMessage} />
      <ChatInput message={message} setMessage={setMessage} trigger={trigger} />
    </div>
  );
};

export default ChatContainer;
