import React, { useEffect, useState } from "react";
import "./UserCard.css";
import Loader from "../layouts/Loader/Loader";
import axios from "axios";
import { useAlert } from "react-alert";

const UserCard = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const alert = useAlert();

  const fetchUser = async (id) => {
    try {
      const url = `https://reqres.in/api/users/${id}`;
      const res = await axios.get(url);
      setUser(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      setError(null);
    }
    fetchUser(userId);
  }, [userId, alert, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="user">
          <div className="avatar">
            <img src={user.avatar} alt="User photo" />
          </div>
          <div className="info">
            <div className="name">
              {user.first_name} {user.last_name}
            </div>
            <p className="email">{user.email}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
