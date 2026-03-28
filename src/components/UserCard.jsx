import React from "react";

const genderList = {
  male: "M",
  female: "F",
  others: "Others",
};

const render = (val) => {
  return genderList[val];
};

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;

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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
