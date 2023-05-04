import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import Navbar from "../components/Navbar";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "./../states";

const Chat = () => {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [currentChat, setCurrentChat] = useState();

  const { trigger } = useSWRMutation(
    "http://localhost:3000/api/auth/me",
    async (url) => {
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (data.status) {
        setUser(data.user);
      }
    }
  );
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token !== "") {
      trigger();
    }
  }, [token, trigger]);

  return (
    <>
      {user !== undefined && (
        <div className="flex flex-col h-screen">
          <Navbar currentUser={user} />
          <div className="grid grid-cols-9 flex-1">
            {/* <div className=" col-span-1 border-r border-night"></div> */}
            {user && (
              <Contacts
                currentUserId={user._id}
                chatChange={handleChatChange}
              />
            )}
            {currentChat && (
              <ChatContainer currentChat={currentChat} user={user} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
