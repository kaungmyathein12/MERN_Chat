import { useNavigate } from "react-router-dom";
import AvatarImage from "./AvatarImage";
const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="border-b border-night  px-5 py-2 flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center space-x-3">
        <AvatarImage
          name={currentUser.username}
          className="rounded-xl overflow-hidden"
        />
        <div>
          {/* <h3 className="-mb-1 font-[600]">{currentUser.username}</h3>
          <span className="text-xs font-medium opacity-50">
            {currentUser.email}
          </span> */}
          <h3 className="text-lg font-[700]">CallbackCats</h3>
        </div>
      </div>
      <button className="text-sm font-medium" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
