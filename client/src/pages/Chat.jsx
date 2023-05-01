import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState();

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/register");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <>
      {currentUser !== undefined && (
        <div className="flex flex-col h-screen">
          <Navbar currentUser={currentUser} />
          <div className="grid grid-cols-12 flex-1">
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
