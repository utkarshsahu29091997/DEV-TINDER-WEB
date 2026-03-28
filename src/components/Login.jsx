import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(response?.data?.data));
      navigate("/");
    } catch (error) {
      setErrorMsg(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          email,
          password,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(response?.data?.data));
      navigate("/");
    } catch (error) {
      setErrorMsg(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {showLogin ? "Login" : "Signup"}
        </legend>

        {!showLogin && (
          <>
            <label className="label">Firstname</label>
            <input
              type="text"
              className="input"
              placeholder="Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">Email</label>
            <input
              type="text"
              className="input"
              placeholder="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="text-red-300">{errorMsg}</span>
        <button
          className="btn btn-neutral mt-4"
          onClick={showLogin ? handleLogin : handleSignUp}
        >
          {showLogin ? "Login" : "Signup"}
        </button>

        {showLogin ? (
          <span>
            New user, Click on{" "}
            <span
              className="text-base font-medium cursor-pointer"
              onClick={() => setShowLogin(false)}
            >
              Signup
            </span>
          </span>
        ) : (
          <span>
            Already a user, Click on{" "}
            <span
              className="text-base font-medium cursor-pointer"
              onClick={() => setShowLogin(true)}
            >
              Login
            </span>
          </span>
        )}
      </fieldset>
    </div>
  );
};

export default Login;
