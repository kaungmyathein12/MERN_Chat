const ChatHeader = ({ currentChat }) => {
  return (
    <>
      {currentChat && (
        <nav className="border-b border-night px-5 py-2 flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-x-3">
            {/* <Avatar
              size={35}
              name={currentChat.username}
              colors={["#5E412F", "#FCEBB6", "#78C0A8", "#F07818", "#F0A830"]}
            /> */}
            <div>
              <img src={currentChat.image} className="w-12 h-12 object-cover" />
            </div>
            <div>
              <h3 className="-mb-1 font-[600]">{currentChat.username}</h3>
              <span className="text-xs font-medium opacity-50">
                {currentChat.email}
              </span>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default ChatHeader;
