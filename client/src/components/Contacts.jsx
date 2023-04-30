import Avatar from "boring-avatars";
import { useEffect, useState } from "react";

const Contacts = ({ data, chatChange }) => {
  const [contacts, setContacts] = useState([]);
  const [currentSelected, setCurrentSelected] = useState();

  useEffect(() => {
    setContacts(data);
  }, [data]);

  const changeCurrentChat = (id, contact) => {
    setCurrentSelected(id);
    chatChange(contact);
  };
  return (
    <>
      {contacts &&
        contacts.length > 0 &&
        contacts.map((user) => (
          <div
            key={user._id}
            className={`flex flex-row justify-start items-center gap-x-3 px-3 py-[9px] mx-2 mb-2 rounded-md ${
              currentSelected === user._id ? "bg-[#222]" : ""
            }`}
            onClick={() => changeCurrentChat(user._id, user)}
          >
            <Avatar
              size={42}
              name={user.username}
              variant="beam"
              colors={["#D94052", "#EE7E4C", "#EAD56C", "#94C5A5", "#898B75"]}
            />
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
