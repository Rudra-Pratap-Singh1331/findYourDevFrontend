import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addFriends } from "../store/friendSlice";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import { addChat } from "../store/chatSlice";
import { createSocket } from "../constant/socketConnection";

const LeftSideBar = ({ isOpen = false, onClose = () => {} }) => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const friends = useSelector((store) => store.friendList);
  const socketRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1536);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    return () => disconnect();
  
  }, [userId]);

  useEffect(() => {
    if (!friends || friends.length === 0) fetchFreindList();
  
  }, []);

  if (isDesktop) {
    return (
      <aside className="w-1/5 min-w-[220px] bg-[#252526] flex-col border-r border-[#333] shadow-md">
        <h2 className="text-lg font-bold p-4 border-b border-[#333] text-[#569cd6]">
          Friends
        </h2>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {friends?.map((f) => (
            <div
              key={f._id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#2d2d30] cursor-pointer transition relative"
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
      </aside>
    );
  }

 
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
 
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />


      <div
        className={`absolute left-0 top-0 bottom-0 w-[85%] max-w-xs bg-[#252526] border-r border-[#333] shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <h3 className="text-lg font-semibold text-[#569cd6]">Friends</h3>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-white">
            Close
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full space-y-3">
          {friends?.map((f) => (
            <div
              key={f._id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#2d2d30] cursor-pointer transition relative"
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
                onClose();
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
    </div>
  );
};

export default LeftSideBar;
