// eslint-disable-next-line no-unused-vars
import { X } from "@phosphor-icons/react";
const User = ({ user, currentSelected, changeCurrentChat }) => {
  return (
    <>
      {user && (
        <div
          className={`flex flex-row justify-between items-center gap-x-3 px-2 py-[6px] mx-4 rounded-md cursor-pointer overflow-hidden last:mb-2 ${
            currentSelected === user._id ? "bg-[#222]" : ""
          }`}
          onClick={() => changeCurrentChat(user._id, user)}
        >
          <div className="flex flex-row justify-start items-center gap-x-3">
            <div className="w-8 h-8 rounded overflow-hidden">
              <img
                src={user.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-[500]">{user.username}</h3>
              {/* <span className="text-xs opacity-50 font-medium">Inactive</span> */}
            </div>
          </div>
          {/* <button className="text-xs opacity-50">
            <X size={12} weight="bold" />
          </button> */}
        </div>
      )}
    </>
  );
};

export default User;
