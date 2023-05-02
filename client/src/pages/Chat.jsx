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
            {currentChat && (
              <div className="col-span-2 border-r border-night relative overflow-hidden overflow-y-scroll">
                <div className="absolute inset-0 p-5">
                  <h1 className="font-semibold text-sm mb-4">Notification</h1>
                  <div className="bg-[#222] text-sm px-4 py-3">
                    <p className="font-medium leading-relaxed">
                      Kaung Myat Hein sent you a new message.
                    </p>
                    <div className="text-xs opacity-50 font-medium flex justify-end mt-2 cursor-pointer">
                      <span>Remove</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
