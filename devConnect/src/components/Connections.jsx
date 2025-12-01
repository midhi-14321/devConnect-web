import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // hnadling error case
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-base-100 via-base-200 to-base-100 flex flex-col items-center py-12 px-4">
      <h1 className="font-bold text-4xl mb-10 text-primary drop-shadow-sm">
        Connections
      </h1>

      <div className="w-full max-w-3xl space-y-8">
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, about, photoUrl } =
            connection;

          return (
            <div
              key={connection._id}
              className="card bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl border border-base-300 hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body flex flex-row items-center gap-6">
                {/* Profile Image */}
                <img
                  src={photoUrl}
                  alt="photo"
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/40 shadow-md"
                />

                {/* Details */}
                <div className="flex-1 text-left">
                  <h2 className="font-bold text-2xl text-primary">
                    {firstName + " " + lastName}
                  </h2>

                  <p className="text-sm opacity-75">
                    {age && gender ? `${age} • ${gender}` : ""}
                  </p>

                  <p className="mt-2 text-base leading-relaxed opacity-90">
                    {about}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;
