import Avatar from "boring-avatars";

const ChatHeader = ({ currentChat }) => {
  return (
    <>
      {currentChat && (
        <nav className="border-b border-night px-5 py-3 flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-x-3">
            <Avatar size={42} name={currentChat.username} />
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
