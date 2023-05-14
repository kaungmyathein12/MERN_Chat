import { useEffect, useState } from "react";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretDown,
  CaretRight,
  BellRinging,
  Buildings,
} from "@phosphor-icons/react";
import api from "../api/index";
import Skeleton from "./UI/Skeleton";
import User from "./UI/User";

const sideBarData = [
  {
    title: "See all users",
    path: "/allusers",
    icon: <Buildings weight="bold" />,
  },
  {
    title: "Request List",
    path: "/home",
    icon: <BellRinging weight="bold" />,
  },
  { title: "Direct Messages", path: "/" },
];

const SideBar = ({
  currentUserId,
  chatChange,
  currentSelected,
  setCurrentSelected,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { data, mutate, error, isLoading } = useSWR("contacts", async () => {
    const { data } = await api.get(`/auth/allusers/${currentUserId}`);
    return data;
  });

  const changeCurrentChat = (id, contact) => {
    setCurrentSelected(id);
    chatChange(contact);
  };
  useEffect(() => {
    if (currentUserId) {
      mutate();
    }
  }, [currentUserId, mutate]);

  return (
    <div className="py-4 border-r border-night w-[280px] flex flex-col flex-shrink-0">
      {sideBarData &&
        sideBarData.length > 0 &&
        sideBarData.map((item) => {
          if (item.title === "Direct Messages")
            return (
              <div key={item.title} className="flex flex-col">
                <div
                  className="flex flex-row justify-start items-center gap-x-2 px-5 py-3 opacity-80 cursor-pointer select-none"
                  onClick={() => {
                    setOpenDropdown(!openDropdown);
                  }}
                >
                  <button>
                    {!openDropdown ? (
                      <CaretRight weight="fill" size={14} />
                    ) : (
                      <CaretDown weight="fill" size={14} />
                    )}
                  </button>

                  <h4 className="text-sm font-medium ">Direct Message</h4>
                </div>
                <AnimatePresence>
                  {openDropdown && (
                    <motion.div
                      key={openDropdown}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {error && "An error has occurred"}
                      {isLoading &&
                        [1, 2, 3, 4].map((el) => <Skeleton key={el} />)}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          return (
            <div
              key={item.title}
              onClick={() => setCurrentSelected(item.title)}
              className={`bg-[#101010] z-50 text-sm font-medium flex flex-row justify-start items-center gap-x-2 ml-[14px] mr-[16px] px-[10px] py-[12px] rounded-md opacity-80
        ${currentSelected === item.title && "bg-[#222]"} cursor-pointer`}
            >
              {item.icon}
              <h4 className="">{item.title}</h4>
            </div>
          );
        })}
    </div>
  );
};

export default SideBar;
