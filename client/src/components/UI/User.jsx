import Avatar from "boring-avatars";

const User = ({ user, currentSelected, changeCurrentChat }) => {
  return (
    <>
      {user && (
        <div
          className={`flex flex-row justify-start items-center gap-x-3 px-4 py-[8px] mx-4 mb-2 rounded-md cursor-pointer overflow-hidden ${
            currentSelected === user._id ? "bg-[#222]" : ""
          }`}
          onClick={() => changeCurrentChat(user._id, user)}
        >
          <div>
            <Avatar
              size={36}
              name={user.username}
              colors={["#5E412F", "#FCEBB6", "#78C0A8", "#F07818", "#F0A830"]}
            />
          </div>
          <div>
            <h3 className=" text-sm font-[600] -mb-1">{user.username}</h3>
            <span className="text-xs opacity-50">
              {/* {user.email} */}Hello World
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
