import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((state) => state.connection);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsData) return null;

  if (connectionsData.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="text-center my-5">
      <div className="text-3xl">Connections</div>
      {connectionsData.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="bg-base-300 flex m-5 p-2 w-xl gap-1.5 mx-auto rounded-lg">
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
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
