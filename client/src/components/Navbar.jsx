import Avatar from "boring-avatars";

const Navbar = ({ currentUser }) => {
  return (
    <nav className="border-b border-night px-5 py-4 flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center space-x-3">
        <Avatar
          size={42}
          name={currentUser.username}
          variant="beam"
          colors={["#D94052", "#EE7E4C", "#EAD56C", "#94C5A5", "#898B75"]}
        />
        <div>
          <h3 className="-mb-1 font-[600]">{currentUser.username}</h3>
          <span className="text-xs font-medium opacity-50">
            {currentUser.email}
          </span>
        </div>
      </div>
      <button className="text-sm font-medium">Logout</button>
    </nav>
  );
};

export default Navbar;
