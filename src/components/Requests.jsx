import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestsData = useSelector((state) => state.request);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestsData) return null;

  if (requestsData.length === 0) return <h1>No requests received</h1>;

  return (
    <div className="text-center my-5">
      <div className="text-3xl">Requests</div>
      {requestsData.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          request.fromUserId;
        return (
          <>
            <div
              className="bg-base-300 items-center  flex m-5 p-2 w-2/3 gap-1.5 mx-auto rounded-lg"
              key={_id}
            >
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
              <div className="text-left  mt-1">
                <span className="text-xl capitalize">
                  {firstName + " " + lastName}
                </span>
                {age && gender && <span>{age + ", " + gender}</span>}
                <p>{about.substring(0, 20)}</p>
              </div>
              <div className=" flex justify-end">
                <button className="btn btn-primary mx-2">Reject</button>
                <button className="btn btn-secondary mx-2">Accept</button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Requests;
