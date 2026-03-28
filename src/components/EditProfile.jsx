import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about ?? "");
  const [gender, setGender] = useState(user.gender ?? "male");
  const [age, setAge] = useState(user.age ?? "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleSave = async () => {
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, gender, age, photoUrl },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(response?.data?.data));
      setSuccessMsg(response?.data?.message);
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    } catch (error) {
      setErrorMsg(error?.response?.data);
      console.error(error?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 gap-8">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="text-xl">Edit Profile</div>

          <label className="label">Firstname</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Lastname</label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="label">Gender</label>
          <select
            value={gender}
            className="select"
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled={true}>Gender</option>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"others"}>Others</option>
          </select>

          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">About</label>
          <textarea
            className="textarea"
            placeholder=""
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button className="btn btn-neutral mt-4" onClick={handleSave}>
            Save
          </button>
        </fieldset>
        <UserCard user={user} />
      </div>
      {successMsg && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{successMsg}</span>
          </div>
        </div>
      )}
      {errorMsg && (
        <div className="toast toast-top toast-center">
          <div className="alert text-red-300">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
