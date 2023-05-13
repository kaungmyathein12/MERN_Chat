import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "../components/Layouts/AuthPage";
import { formStyles } from "./Login";

const Profile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://scontent.frgn9-1.fna.fbcdn.net/v/t1.6435-9/117894548_188257752691900_7569134315138272792_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=bqBTkSTiKWQAX-jOhPJ&_nc_ht=scontent.frgn9-1.fna&oh=00_AfDHq29y5JbLmRx5U5rV8Pwt3dVbzS-7nrolbWw8d5TNdg&oe=6486A011"
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
        <button className={`${formStyles.btnElement} w-full`}>
          Upload Photo
        </button>
      </div>
    </AuthPage>
  );
};

export default Profile;
