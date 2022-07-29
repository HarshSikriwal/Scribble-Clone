import React, { useContext, useState } from "react";
import AlertContext from "../context/AlertContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PaintContext from "../context/PaintContext";

function Join() {
  const { dispatch, socket } = useContext(PaintContext);
  const { alert, writeAlert } = useContext(AlertContext);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [params, _] = useSearchParams();

  const onJoinRoom = () => {
    if (!user) {
      writeAlert({ type: "error", message: "Please enter a username" });
      return;
    }

    dispatch({
      type: "SET_USER",
      payload: user,
    });
    dispatch({
      type: "SET_ROOM",
      payload: params.get("id"),
    });

    socket.emit("addParticipant", params.get("id"), user);
    navigate(`/room?id=${params.get("id")}`);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <div className="input-group input-group-sm justify-center">
        <label htmlFor="username" className="bg-black text-white px-2">
          Username:{" "}
        </label>
        <input
          type="text"
          id="username"
          className="input input-sm input-bordered"
          value={user}
          onChange={(e) => {
            setUser(e.target.value.trim());
          }}
        />
      </div>
      <div className="btn btn-xs w-fit custom" onClick={onJoinRoom}>
        Join Room
      </div>
      {alert ? (
        <div className={`alert alert-${alert.type} w-fit p-2 text-xs`}>
          {alert.message}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Join;
