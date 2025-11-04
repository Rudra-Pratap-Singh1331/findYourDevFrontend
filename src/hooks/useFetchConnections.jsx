import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const useFetchConnections = () => {
  const [connections, setConnections] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchConnections = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/connections`,
        {
          withCredentials: true,
        }
      );
      setConnections(result?.data?.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return { loading, connections, setConnections };
};

export default useFetchConnections;
