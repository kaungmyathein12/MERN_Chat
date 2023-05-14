import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import { useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "../states";
import api from "../api";
import AllUser from "./AllUser";
import Request from "./Request";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [currentChat, setCurrentChat] = useState();
  const [currentSelected, setCurrentSelected] = useState();

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
    if (localStorage.getItem("token")) {
      if (token) {
        trigger();
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {user !== undefined && (
        <div className="flex flex-col h-screen">
          <Navbar currentUser={user} />
          <div className="flex flex-row flex-1">
            {user && (
              <SideBar
                currentUserId={user._id}
                chatChange={handleChatChange}
                currentSelected={currentSelected}
                setCurrentSelected={setCurrentSelected}
              />
            )}
            {currentChat && (
              <Page currentSelected={currentSelected}>
                <ChatContainer currentChat={currentChat} user={user} />
              </Page>
            )}
            {currentSelected === "Request List" && <Request />}
            {currentSelected === "See all users" && <AllUser />}
            <Page currentSelected={currentSelected}>
              <div className="w-[320px] px-5 py-5 mr-0 ml-auto border-l border-night">
                <div className="h-[260px]">
                  {user.image && (
                    <img
                      src={user.image}
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
            </Page>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

export const Page = ({ children, currentSelected }) => {
  return (
    <>
      {currentSelected &&
        currentSelected !== "Request List" &&
        currentSelected !== "See all users" && <>{children}</>}
    </>
  );
};
