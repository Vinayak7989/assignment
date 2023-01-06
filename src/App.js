import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/layouts/Loader/Loader";
import UserCard from "./components/User/UserCard.js";
import { useAlert } from "react-alert";
import "./App.css";
import { getAllUsers, userActions } from "./store/user-slice";

function App() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userActions.clearErrors());
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error]);

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentUserId ? (
            <UserCard className="userCard" userId={currentUserId} />
          ) : (
            <div className="placeholderBox">
              Click any button to load the user...
            </div>
          )}
          {users && (
            <div className="userButtons">
              {users.map((user, i) => (
                <button key={i} onClick={() => setCurrentUserId(user.id)}>
                  {user.id}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
