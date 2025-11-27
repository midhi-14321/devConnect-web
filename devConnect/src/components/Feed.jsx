import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.user);
  const getFeed = async () => {
    if (feed) {
      return;
    }
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
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed} />
      </div>
    )
   
  );
};
export default Feed;
