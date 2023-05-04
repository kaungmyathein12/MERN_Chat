import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";

import Navbar from "../components/Navbar";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import api from "../api";

const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState();

  const { trigger, error, isMutating } = useSWRMutation(
    "/auth/me",
    async (url) => {
      const user = await api.get(url);
    }
  );
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <>
      {currentUser !== undefined && (
        <div className="flex flex-col h-screen">
          <Navbar currentUser={currentUser} />
          <div className="grid grid-cols-9 flex-1">
            {/* <div className=" col-span-1 border-r border-night"></div> */}
            {currentUser && (
              <Contacts
                currentUserId={currentUser._id}
                chatChange={handleChatChange}
              />
            )}
            {currentChat && (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
