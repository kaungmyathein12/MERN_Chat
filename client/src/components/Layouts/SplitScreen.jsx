import { useRecoilValue } from "recoil";
import { userAtom } from "../../states";
import Navbar from "../Navbar";

const SplitScreen = ({ children }) => {
  const user = useRecoilValue(userAtom);
  const [sideBar, main] = children;
  return (
    <div className="flex h-screen flex-col">
      <Navbar currentUser={user} />
      <div className="flex flex-1 flex-row">
        <div className="flex w-[280px] flex-shrink-0 flex-col border-r border-night py-4">
          {sideBar}
        </div>
        <div className="relative flex flex-grow flex-col">{main}</div>
      </div>
    </div>
  );
};

export default SplitScreen;
