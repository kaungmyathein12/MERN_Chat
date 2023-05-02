import { useEffect, useState } from "react";
import useSWR from "swr";
import api from "./../api/index";
import Skeleton from "./UI/Skeleton";
import User from "./UI/User";

const Contacts = ({ currentUserId, chatChange }) => {
  const { data, mutate, error, isLoading } = useSWR("contacts", async () => {
    const { data } = await api.get(`/auth/allusers/${currentUserId}`);
    return data;
  });

  const [currentSelected, setCurrentSelected] = useState();

  const changeCurrentChat = (id, contact) => {
    setCurrentSelected(id);
    chatChange(contact);
  };
  useEffect(() => {
    if (currentUserId) {
      mutate();
    }
  }, [currentUserId]);

  return (
    <div className="py-4 border-r border-night col-span-2 flex flex-col">
      <h4 className="mb-4 text-sm font-semibold px-5">Contact</h4>
      <input
        type="text"
        className="mx-4 bg-[#222] outline-none text-sm py-3 px-3 mb-4 rounded"
        placeholder="Search user"
      />
      <div className="flex-1 relative overflow-hidden overflow-y-scroll scrollbar-hide">
        <div className=" absolute inset-0">
          {error && "An error has occurred"}
          {isLoading && [1, 2, 3, 4].map((el) => <Skeleton key={el} />)}
          {data &&
            data.users &&
            data.users.length > 0 &&
            data.users.map((user) => (
              <User
                key={user._id}
                user={user}
                currentSelected={currentSelected}
                changeCurrentChat={changeCurrentChat}
              />
            ))}
          {data && data.users && data.users.length < 1 && (
            <p className="mx-4 text-sm opacity-50">
              There is no user to display.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
