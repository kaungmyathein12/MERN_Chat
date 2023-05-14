import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { userAtom } from "../states";

import api from "../api";
const AllUser = () => {
  const user = useRecoilValue(userAtom);
  const { data, error, isLoading } = useSWR("contacts", async () => {
    const { data } = await api.get(`/auth/allusers/${user._id}`);
    return data;
  });

  return (
    <div className="flex-grow p-5 bg-[#010101]">
      <h1 className="text-lg font-medium">See all users</h1>
      <input
        type="text"
        placeholder="Enter username"
        className="w-1/3 outline-none bg-[#101010] my-4 p-3 rounded-md text-sm"
      />
      <div className="w-full grid grid-cols-6 mt-4 gap-5">
        {data &&
          data.users.length > 0 &&
          data.users.map((user) => (
            <div
              key={user._id}
              className="border border-night bg-[#101010] rounded-md overflow-hidden"
            >
              <div className="h-36 w-full">
                <img
                  src={user.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h5 className="text-sm font-semibold">{user.username}</h5>
                <span className="text-xs opacity-70">{user.email}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllUser;
