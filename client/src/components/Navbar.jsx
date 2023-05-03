import Avatar from "boring-avatars";
import { useNavigate } from "react-router-dom";
const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="border-b border-night px-5 py-4 flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center space-x-3">
        <Avatar
          size={42}
          name={currentUser.username}
          colors={["#5E412F", "#FCEBB6", "#78C0A8", "#F07818", "#F0A830"]}
        />
        <div>
          <h3 className="-mb-1 font-[600]">{currentUser.username}</h3>
          <span className="text-xs font-medium opacity-50">
            {currentUser.email}
          </span>
        </div>
      </div>
      <button className="text-sm font-medium" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
