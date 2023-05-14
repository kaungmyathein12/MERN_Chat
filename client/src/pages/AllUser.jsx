import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../states";

import api from "../api";
import { useEffect, useState } from "react";
const AllUser = () => {
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);
  const [requestId, setRequestId] = useState("");
  const { data } = useSWR("contacts", async () => {
    const { data } = await api.get(`/auth/allusers/${user._id}`);
    return data;
  });

  const { trigger } = useSWRMutation("/auth/user/sendrequest", async (url) => {
    await api.post(
      url,
      {
        sender: user,
        receiverId: requestId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  });

  useEffect(() => {
    if (requestId) {
      trigger();
    }
  }, [requestId, trigger]);

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
          data.users.map((item) => {
            const result = user.requestFriendList.find(
              (el) => el.id === item._id
            );
            if (result) {
              return (
                <div
                  key={item._id}
                  className="border border-night bg-[#101010] rounded-md overflow-hidden"
                >
                  <div className="h-36 w-full">
                    <img
                      src={result.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex flex-row items-center gap-x-2">
                      <h5 className="text-sm font-semibold flex-shrink-0">
                        {result.username}
                      </h5>
                    </div>
                    <button
                      className="w-full mt-2 bg-[#333] text-xs px-4 py-2 font-semibold rounded-md"
                      // onClick={() => setRequestId(result._id)}ß
                    >
                      Remove Request
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={item._id}
                  className="border border-night bg-[#101010] rounded-md overflow-hidden"
                >
                  <div className="h-36 w-full">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex flex-row items-center gap-x-2">
                      <h5 className="text-sm font-semibold flex-shrink-0">
                        {item.username}
                      </h5>
                    </div>
                    <button
                      className="w-full mt-2 bg-green-600 text-xs px-4 py-2 font-semibold rounded-md"
                      onClick={() => setRequestId(item._id)}
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default AllUser;
