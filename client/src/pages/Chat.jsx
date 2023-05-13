import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import Navbar from "../components/Navbar";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import { useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "./../states";
import api from "../api";
import { X } from "@phosphor-icons/react";

const Chat = () => {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [currentChat, setCurrentChat] = useState();
  const { trigger } = useSWRMutation("/auth/me", async (url) => {
    try {
      const { data } = await api.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (data.status) {
        setUser(data.user);
      } else {
        alert("Request time out. Login again");
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  });
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
          <div className="flex flex-row flex-1">
            {user && (
              <Contacts
                currentUserId={user._id}
                chatChange={handleChatChange}
              />
            )}
            {currentChat && (
              <ChatContainer currentChat={currentChat} user={user} />
            )}
            <div className="w-[320px] px-5 py-5">
              <div className="mb-5 flex justify-end">
                <X size={26} />
              </div>
              <div className="h-[260px]">
                {user.image && (
                  <img
                    src="https://i.pinimg.com/originals/2c/9c/20/2c9c20954029da1dec1020493d9b1347.jpg"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="my-3">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <span className="text-sm opacity-50">{user.email}</span>
              </div>
              <button className="text-center bg-white text-black w-full py-2 text-sm mt-1 rounded font-semibold">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
