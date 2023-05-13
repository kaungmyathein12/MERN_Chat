import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "../components/Layouts/AuthPage";
import { formStyles } from "./Login";
import useSWRMutation from "swr/mutation";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../states";
import axios from "axios";

const Profile = () => {
  const token = useRecoilValue(tokenAtom);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { trigger, isMutating } = useSWRMutation(
    "auth/profile",
    async (url) => {
      if (token) {
        const { data } = await axios.post(
          `http://localhost:3000/api/v1/${url}`,
          {
            image: imageUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (data.status) {
          navigate("/");
        }
      }
    }
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <AuthPage>
      <div className="w-[400px]">
        <h1 className="text-start text-xl font-semibold mb-4">
          Enter your profile URL
        </h1>
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full bg-transparent border-2 border-night outline-none px-3 py-4 text-sm"
            placeholder="Enter profile URL"
            value={imageUrl}
            onChange={(e) => {
              setError(false);
              setImageUrl(e.target.value);
            }}
          />
        </div>
        {!error && imageUrl && (
          <div className="w-32 h-32 overflow-hidden mb-4">
            <img
              src={imageUrl}
              onError={(error) => {
                if (error.type === "error") {
                  setError(true);
                }
              }}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <button className={`${formStyles.btnElement} w-full`} onClick={trigger}>
          {!isMutating ? "Upload Photo" : "Loading..."}
        </button>
      </div>
    </AuthPage>
  );
};

export default Profile;
