import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  //   const [showButtons, setShowButtons] = useState(true);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      //error handling
    }
  };
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      //error handling
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center">no requests found</h1>;

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="font-bold text-4xl mb-6 text-primary">Requests</h1>

      <div className="w-full max-w-3xl space-y-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="card bg-base-200 shadow-xl rounded-2xl border border-base-300 hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body flex flex-row items-center space-x-5">
                {/* Image */}
                <img
                  src={photoUrl}
                  alt="photo"
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/40 shadow-md"
                />

                {/* User Info */}
                <div className="flex-1 text-left">
                  <h2 className="font-bold text-2xl text-primary">
                    {firstName + " " + lastName}
                  </h2>

                  <p className="text-sm opacity-80">
                    {age && gender ? `${age} • ${gender}` : ""}
                  </p>

                  <p className="mt-1 text-base">{about}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <button
                    className="btn btn-success btn-sm rounded-xl shadow-md hover:scale-105 transition-all"
                    onClick={() => reviewRequests("accepted", request._id)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-error btn-sm rounded-xl shadow-md hover:scale-105 transition-all"
                    onClick={() => reviewRequests("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Requests;
