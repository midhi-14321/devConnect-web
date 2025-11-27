import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [toast, showToast] = useState(false);

  const [error, setError] = useState(" ");
  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError('')
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          age,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data);
    }
  };
  return (
    <>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-10">
        <div className="flex justify-center  mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title flex justify-center">Edit Profile</h2>

              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend   ">FirstName</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <legend className="fieldset-legend   ">LastName</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <legend className="fieldset-legend   ">PhotoUrl</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <legend className="fieldset-legend   ">Age</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <legend className="fieldset-legend   ">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <legend className="fieldset-legend   ">About</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              {/* <p className="text-red-500">{error}</p> */}
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about }}
        />
      </div>
    </>
  );
};
export default EditProfile;
