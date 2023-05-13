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
          <div className="w-11 h-11 rounded overflow-hidden">
            <img
              src={user.image}
              alt=""
              className="w-full h-full object-cover"
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
