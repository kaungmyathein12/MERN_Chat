import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import { useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "../states";
import api from "../api";
import AllUser from "./AllUser";
import Request from "./Request";
import SplitScreen from "../components/Layouts/SplitScreen";

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
        <SplitScreen>
          <SideBar
            currentUserId={user._id}
            chatChange={handleChatChange}
            currentSelected={currentSelected}
            setCurrentSelected={setCurrentSelected}
          />
          <React.Fragment>
            {currentChat && (
              <Page currentSelected={currentSelected}>
                <ChatContainer currentChat={currentChat} user={user} />
              </Page>
            )}
            {currentSelected === "Request List" && <Request />}
            {currentSelected === "See all users" && <AllUser />}
          </React.Fragment>
        </SplitScreen>
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
