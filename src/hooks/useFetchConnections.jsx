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
      const result = await axios.get("http://localhost:1001/user/connections", {
        withCredentials: true,
      });
      setConnections(result?.data?.data);
    
    } catch (error) {
      setLoading(false);
      toast.error("An error Occured while fetching Connection Requests!");
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
