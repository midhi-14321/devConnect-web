import React from "react";
import { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      console.error(err);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      //error handling
      setError(err.response?.data || "Something went wrong");
    }
  };
 
  return (
    <div className="">
      <div className="flex justify-center my-10 ">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex justify-center">
              {isLoginForm ? "Login" : "SignUp"}
            </h2>
            <div>
              <fieldset className="fieldset">
                {!isLoginForm && (
                  <>
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
                  </>
                )}
                <legend className="fieldset-legend   ">Email ID</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <legend className="fieldset-legend   ">Password</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "SignUp"}
              </button>
            </div>
            <p
              className="m-auto cursor-pointer"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New user? SignUp here"
                : "Existing User ? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

