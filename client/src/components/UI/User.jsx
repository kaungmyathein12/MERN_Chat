import Avatar from "boring-avatars";

const User = ({ user, currentSelected, changeCurrentChat }) => {
  return (
    <>
      {user && (
        <div
          className={`flex flex-row justify-start items-center gap-x-3 px-4 py-[9px] mx-2 mb-2 rounded-md cursor-pointer overflow-hidden ${
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
              {/* {user.email} */}Hello World
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
