import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { userActions, getAllUsers } from "../../store/user-slice";
import Loader from "../layouts/Loader/Loader";
import UserCard from "./UserCard.js";
import "./AllUsers.css";

const AllUsers = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentUserId, setCurrentUserId] = useState(null);

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userActions.clearErrors());
    }
    dispatch(getAllUsers());
  }, [dispatch, error, alert]);

  console.log(users);
  console.log(users, loading, error);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {currentUserId ? (
            <UserCard userId={currentUserId} />
          ) : (
            <div className="placeHolderBox"></div>
          )}
          <div className="users">
            {users.map((user, i) => (
              <UserCard key={i} user={user} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllUsers;
