import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length <= 0)
    return (
      <div
        className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4 "
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-primary opacity-80 text-center">
          No new users found
        </h1>
      </div>
    );

  return (
    feed && (
      <div
        className="
        min-h-screen w-full 
        flex items-center justify-center 
        bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50
        px-4 py-12
      "
      >
        <div className="w-auto max-w-sm sm:max-w-md md:max-w-lg">
          <div
            className="
            bg-white 
            rounded-2xl 
            border border-gray-200
            shadow-sm
            p-5 sm:p-7 
            transition-all duration-300
            hover:shadow-md
          "
          >
            <UserCard user={feed[0]} />
          </div>
        </div>
      </div>
    )
  );
};
export default Feed;
