import React, { useState, useRef, useEffect } from "react";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import { removeChat } from "../store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { createSocket } from "../constant/socketConnection";
import useFetchChat from "../hooks/useFetchChat";
import { formatTime } from "../helpers/formatTime";

const ChatWindow = ({ chat }) => {
  const { _id, fullName, photoUrl } = chat;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userId = user._id;
  const { messages, setMessages, loading } = useFetchChat(_id);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const { socket, disconnect } = createSocket();
    socketRef.current = socket;
    socketRef.current.emit("joinChat", { userId, _id });
    socketRef.current.on("messageReceived", ({ text, time, userId }) => {
      setMessages((prev) => [...prev, { text, time, fromUserId: userId }]);
    });
    return () => disconnect();
  }, [userId, _id, setMessages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const now = new Date();
    const currHour = now.getHours();
    const currminute = now.getMinutes();
    const formattedTime = `${currHour % 12 || 12}:${currminute
      .toString()
      .padStart(2, "0")} ${currHour >= 12 ? "PM" : "AM"}`;
    setMessages((prev) => [
      ...prev,
      { text: newMessage, time: formattedTime, fromUserId: userId },
    ]);
    socketRef.current.emit("sendMessage", {
      userId,
      _id,
      text: newMessage,
      time: formattedTime,
    });
    socketRef.current.emit("notifyTheUser", { _id, userId });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#1e1e1e] border border-[#3c3c3c] z-50">
    
      <div className="flex items-center justify-between p-3 border-b border-[#252526] sticky top-0 bg-[#1e1e1e] z-10">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full border border-gray-700">
              <img src={photoUrl || AVATAR_DEFAULT_URL} alt={fullName} />
            </div>
          </div>
          <span className="font-medium text-[#569cd6]">{fullName}</span>
        </div>
        <button
          className="btn btn-ghost btn-sm text-[#569cd6] hover:text-white"
          onClick={() => dispatch(removeChat())}
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <p className="text-center text-gray-500">Loading Your Chats..</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">
            Start your first Conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.fromUserId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble max-w-[70%] break-words whitespace-pre-wrap shadow-md rounded-2xl ${
                  msg.fromUserId === userId
                    ? "bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-gray-100"
                    : "bg-[#1f2024] text-gray-100"
                }`}
              >
                {msg.text}
                <span className="text-[10px] font-extralight ml-2 block text-right text-gray-400">
                  {msg.time || (msg.createdAt ? formatTime(msg.createdAt) : "")}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>


      <div className="p-3 border-t border-[#252526] flex gap-2 sticky bottom-0 bg-[#1e1e1e] z-10">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered flex-1 bg-[#252526] text-gray-100 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="btn bg-[#0a84ff] text-white hover:bg-[#006fcf]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
