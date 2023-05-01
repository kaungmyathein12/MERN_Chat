import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Contacts from "../components/Contacts";
const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  const [setCurrentChat] = useState();

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
          <div className="grid grid-cols-10 flex-1">
            <div className=" py-4 border-r border-night col-span-2">
              <h4 className="mb-4 text-sm font-semibold px-5">Contact</h4>
              {currentUser && (
                <Contacts
                  currentUserId={currentUser._id}
                  chatChange={handleChatChange}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
