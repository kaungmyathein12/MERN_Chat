import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../api/index";
import Navbar from "../components/Navbar";
import Contacts from "../components/Contacts";
const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState();

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const getAllUser = async (id) => {
    const { data } = await api.get(`/auth/allusers/${id}`);
    if (data.status) {
      setContacts(data.users);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/register");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      getAllUser(currentUser._id);
    }
  }, [currentUser]);

  return (
    <>
      {currentUser !== undefined && (
        <div className="flex flex-col h-screen">
          <Navbar currentUser={currentUser} />
          <div className="grid grid-cols-10 flex-1">
            <div className=" py-4 border-r border-night col-span-2">
              <h4 className="mb-4 text-sm font-semibold px-5">Contact</h4>
              <Contacts data={contacts} chatChange={handleChatChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
