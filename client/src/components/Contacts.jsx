import { useState } from "react";
import useSWR from "swr";
import Avatar from "boring-avatars";
import api from "./../api/index";
import Skeleton from "./UI/Skeleton";

const Contacts = ({ currentUserId, chatChange }) => {
  const { data, error, isLoading } = useSWR("contacts", async () => {
    const { data } = await api.get(`/auth/allusers/${currentUserId}`);
    return data;
  });

  const [currentSelected, setCurrentSelected] = useState();

  const changeCurrentChat = (id, contact) => {
    setCurrentSelected(id);
    chatChange(contact);
  };
  if (error) return "An error has occurred";
  if (isLoading) return [1, 2, 3, 4].map((el) => <Skeleton key={el} />);

  return (
    <>
      {data &&
        data.users.length > 0 &&
        data.users.map((user) => (
          <div
            key={user._id}
            className={`flex flex-row justify-start items-center gap-x-3 px-3 py-[9px] mx-2 mb-2 rounded-md ${
              currentSelected === user._id ? "bg-[#222]" : ""
            }`}
            onClick={() => changeCurrentChat(user._id, user)}
          >
            <div>
              <Avatar
                size={40}
                name={user.username}
                variant="beam"
                colors={["#D94052", "#EE7E4C", "#EAD56C", "#94C5A5", "#898B75"]}
              />
            </div>
            <div>
              <h3 className=" text-sm font-[600]">{user.username}</h3>
              <span className="text-xs font-medium opacity-50">
                {user.email}
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

export default Contacts;
