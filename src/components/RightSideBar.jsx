import useFetchConnections from "../hooks/useFetchConnections";
import { useSelector } from "react-redux";
import getDate from "../helpers/getDate";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { toast } from "react-toastify";
const RightSideBar = () => {
  const loggedInUser = useSelector((store) => store.user);
  const { connections, setConnections } = useFetchConnections();

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
      toast.error(error?.response?.data?.error?.message);
    }
  };

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
          <div className="w-full flex flex-row justify-center">
            <p>No connection Requests</p>
          </div>
        ) : (
          connections?.map((user) => (
            <div
              key={user?._id}
              className="card w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-[#3a3a3a] overflow-hidden"
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
                      alt={
                        user?.fromUserId?._id === loggedInUser?._id
                          ? user?.toUserId?.fullName
                          : user?.fromUserId?.fullName
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

      
                <div className="flex-1 min-w-0">
                  <h2
                    className="card-title text-[#e5e5e5] break-words text-[10px]"
                    title={
                      user?.fromUserId?._id === loggedInUser?._id
                        ? user?.toUserId?.fullName
                        : user?.fromUserId?.fullName
                    }
                  >
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
                <div className="w-full text-center py-1">
                  {`sent on ${getDate(user?.createdAt)}`}
                </div>
              ) : (
                <div className="card-actions justify-end mt-2 px-4 pb-3 gap-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      handlerequest("Accepted", user?._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      handlerequest("Rejected", user?._id);
                    }}
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
};

export default RightSideBar;
