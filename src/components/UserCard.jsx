import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const genderList = {
  male: "M",
  female: "F",
  others: "Others",
};

const render = (val) => {
  return genderList[val];
};

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeFeed(userId));
    } catch (error) {}
  };

  return (
    <div className="card bg-base-300 w-75 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <span>{age && gender && `${age}, ${render(gender)}`}</span>
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
