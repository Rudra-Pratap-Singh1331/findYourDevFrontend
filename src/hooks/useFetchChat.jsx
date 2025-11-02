import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchChat = (toUserId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchChat = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `http://localhost:1001/chat/getchats/${toUserId}`,
        {
          withCredentials: true,
        }
      );
      setMessages(res?.data?.data);
    } catch (error) {
      setLoading(false)
     
    } finally { 
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchChat();
  }, [toUserId]);
  return { messages, setMessages , loading};
};

export default useFetchChat;
