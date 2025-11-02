import React, { useEffect, useState, useRef } from "react";
import { MessageSquare, Send } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { formatTime } from "../helpers/formatTime";
import { createSocket } from "../constant/socketConnection";

const GroupedChat = ({ setChat, chat }) => {
  const { chatId } = chat;
  const user = useSelector((store) => store.user);
  const userId = user._id;
  const [groupDetail, setGroupDetail] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const fetchChatGroupDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:1001/hackathons/chatgroup/${chatId}`,
        { withCredentials: true }
      );
      setGroupDetail(res?.data?.data[0]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load");
    }
  };

  const fetchChat = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:1001/chat/getgroupchats/${chatId}`,
        { withCredentials: true }
      );
      setMessage(res?.data?.data[0]?.messages || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load chat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    fetchChatGroupDetails();
    fetchChat();
  }, []);

  useEffect(() => {
    const { socket, disconnect } = createSocket();
    socketRef.current = socket;
    socketRef.current.emit("joinGroupChat", { chatId });
    socketRef.current.on(
      "newGroupMessageIncoming",
      ({ text, time, fromUserId, senderName }) => {
        setMessage((prev) => [...prev, { text, time, fromUserId, senderName }]);
      }
    );
    return () => disconnect();
  }, [chatId]);

  const sendmessage = () => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const formattedTime = `${now.getHours() % 12 || 12}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

    socketRef.current.emit("sendGroupMessage", {
      roomId: chatId,
      text: newMessage,
      time: formattedTime,
      fromUserId: userId,
      senderName: user?.fullName,
    });

    setMessage((prev) => [
      ...prev,
      {
        text: newMessage,
        time: formattedTime,
        fromUserId: userId,
        senderName: user?.fullName,
      },
    ]);

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendmessage();
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#1e1e1e] border border-[#3c3c3c] z-50">

      <div className="bg-[#252526] border-b border-[#2d2d2d] p-3 sm:p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-[#007acc]" />
          <h1 className="text-lg sm:text-xl text-white font-semibold truncate">
            {groupDetail?.hackathonTitle || "Group Chat"}
          </h1>
        </div>
        <button
          className="btn btn-ghost btn-sm text-[#569cd6] hover:text-white"
          onClick={() => setChat(false)}
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#1e1e1e]">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : message.length === 0 ? (
          <p className="text-center text-gray-500">
            Start your first Conversation!
          </p>
        ) : (
          message.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.fromUserId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble max-w-[80%] break-words whitespace-pre-wrap shadow-md rounded-2xl ${
                  msg.fromUserId === userId
                    ? "bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-gray-100"
                    : "bg-[#1f2024] text-gray-100"
                }`}
              >
                {msg.fromUserId !== userId && (
                  <div className="text-[11px] font-medium text-[#a3a3a3] mb-1">
                    {msg.senderName}
                  </div>
                )}
                <div>{msg.text}</div>
                <span className="text-[10px] font-extralight ml-2 block text-right text-gray-400">
                  {msg.time || (msg.createdAt ? formatTime(msg.createdAt) : "")}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>


      <div className="bg-[#252526] border-t border-[#2d2d2d] p-3 sm:p-4 flex items-center gap-2 sticky bottom-0 z-10">
        <input
          type="text"
          value={newMessage}
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered flex-1 bg-[#1e1e1e] border-[#2d2d2d] text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          className="btn bg-[#007acc] hover:bg-[#0062a3] text-white"
          onClick={sendmessage}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default GroupedChat;
