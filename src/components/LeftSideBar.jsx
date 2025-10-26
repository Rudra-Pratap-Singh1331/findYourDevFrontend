import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addFriends } from "../store/friendSlice";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import { addChat } from "../store/chatSlice";
import { createSocket } from "../constant/socketConnection";

const LeftSideBar = () => {
  // const [friends, setFriends] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const friends = useSelector((store) => store.friendList);
  const fetchFreindList = async () => {
    try {
      const result = await axios.get("http://localhost:1001/user/friends", {
        withCredentials: true,
      });
      const finalresult = result?.data?.friends?.map((f) => ({
        ...f,
        messageStatus: false,
      }));
      dispatch(addFriends(finalresult));
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Unauthorized!");
        navigate("/login");
      }
    }
  };

  const socketRef = useRef(null);

  useEffect(() => {
    const { socket, disconnect } = createSocket();

    socketRef.current = socket;

    socketRef.current.emit("joinNotificationService", { userId });

    socketRef.current.on("incomingMessage", ({ userId }) => {
      dispatch(
        addFriends(
          friends.map((f) =>
            f._id === userId ? { ...f, messageStatus: true } : f
          )
        )
      );
    });

    return () => {
      disconnect();
    };
  }, [userId]); //ye isliye kyuni first store empty n thats why
  useEffect(() => {
    if (!friends || friends.length === 0) {
      fetchFreindList();
    }
  }, []);

  return (
    <div className="hidden sm:flex w-1/5 min-w-[220px] bg-[#252526] flex-col border-r border-[#333] shadow-md">
      {/* Header */}
      <h2 className="text-lg font-bold p-4 border-b border-[#333] text-[#569cd6]">
        Friends
      </h2>

      {/* Friend List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {friends?.map((f) => (
          <div
            key={f._id}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-[#2d2d30] cursor-pointer transition relative" // relative added
            onClick={() => {
              dispatch(addChat(f));
              dispatch(
                addFriends(
                  friends.map((friend) =>
                    f._id === friend._id
                      ? { ...friend, messageStatus: false }
                      : friend
                  )
                )
              );
            }}
          >
            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring-2 ring-[#569cd6]">
                <img src={f.photoUrl || AVATAR_DEFAULT_URL} alt={f.name} />
              </div>
            </div>

            <span className="font-medium text-[#d4d4d4] relative">
              {f.fullName}
              {f.messageStatus && (
                <span className="absolute top-0 right-[-10px] w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
