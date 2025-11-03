import useFetchConnections from "../hooks/useFetchConnections";
import { useSelector } from "react-redux";
import getDate from "../helpers/getDate";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { formatTime } from "../helpers/formatTime";

const RightSideBar = ({ isOpen = false, onClose = () => {} }) => {
  const loggedInUser = useSelector((store) => store.user);
  const { connections, setConnections } = useFetchConnections();

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1536);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlerequest = async (value, id) => {
    try {
      const res = await axios.post(
        `http://localhost:1001/connection/request/review/${value}/${id}`,
        {},
        { withCredentials: true }
      );
      setConnections((connections) => connections.filter((c) => c._id !== id));
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong"
      );
    }
  };
  const getDate = (createdAt) => {
    if (!createdAt) return "";

    const date = new Date(createdAt);

    // Options for long month name
    const options = { day: "2-digit", month: "long", year: "numeric" };

    // Convert to your local format (e.g., "12 November 2025")
    return date.toLocaleDateString("en-IN", options);
  };

  if (isDesktop) {
    return (
      <div className="w-1/5 min-w-[180px] bg-[#252526] flex flex-col border-l border-[#333] shadow-md overflow-x-hidden">
        <div
          role="tablist"
          className="tabs-bordered p-4 border-b border-[#333] text-center text-[#569cd6]"
        >
          <p>Connection Requests</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {connections?.length === 0 ? (
            <div className="w-full flex justify-center">
              <p>No connection Requests</p>
            </div>
          ) : (
            connections?.map((user) => (
              <div
                key={user?._id}
                className="card w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md hover:shadow-lg hover:border-[#3a3a3a]"
              >
                <div className="card-body flex flex-row items-center gap-4 p-4">
                  <div className="avatar flex-shrink-0">
                    <div className="w-8 h-8 rounded-full ring-2 ring-blue-500/30 overflow-hidden">
                      <img
                        src={
                          user?.fromUserId?._id === loggedInUser?._id
                            ? user?.toUserId?.photoUrl
                            : user?.fromUserId?.photoUrl
                        }
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-[#e5e5e5] text-[12px] break-words">
                      {user?.fromUserId?._id === loggedInUser?._id
                        ? user?.toUserId?.fullName
                        : user?.fromUserId?.fullName}
                    </h2>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="badge badge-warning text-[10px] font-medium text-black">
                      {user?.status}
                    </span>
                  </div>
                </div>

                {user?.fromUserId?._id === loggedInUser._id ? (
                  <div className="w-full text-center py-1 text-gray-400 text-[11px]">
                    {`sent on ${getDate(user?.createdAt)}`}
                  </div>
                ) : (
                  <div className="flex justify-end mt-2 px-4 pb-3 gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlerequest("Accepted", user?._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handlerequest("Rejected", user?._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
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
        className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#252526] border-l border-[#333] shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-[#333] text-[#569cd6] flex items-center justify-between">
          <p className="font-semibold">Connection Requests</p>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-white">
            Close
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[80vh] space-y-3">
          {connections?.length === 0 ? (
            <div className="w-full flex justify-center">
              <p>No connection Requests</p>
            </div>
          ) : (
            connections?.map((user) => (
              <div
                key={user?._id}
                className="card w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md hover:shadow-lg hover:border-[#3a3a3a]"
              >
                <div className="card-body flex items-center gap-4 p-4">
                  <div className="avatar flex-shrink-0">
                    <div className="w-8 h-8 rounded-full ring-2 ring-blue-500/30 overflow-hidden">
                      <img
                        src={
                          user?.fromUserId?._id === loggedInUser?._id
                            ? user?.toUserId?.photoUrl
                            : user?.fromUserId?.photoUrl
                        }
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-[#e5e5e5] text-[12px] break-words">
                      {user?.fromUserId?._id === loggedInUser?._id
                        ? user?.toUserId?.fullName
                        : user?.fromUserId?.fullName}
                    </h2>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="badge badge-warning text-[10px] font-medium text-black">
                      {user?.status}
                    </span>
                  </div>
                </div>

                {user?.fromUserId?._id === loggedInUser._id ? (
                  <div className="w-full text-center py-1 text-gray-400 text-[11px]">
                    {`sent on ${formatTime(user?.createdAt)}`}
                  </div>
                ) : (
                  <div className="flex justify-end mt-2 px-4 pb-3 gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlerequest("Accepted", user?._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handlerequest("Rejected", user?._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
