import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";

import { Outlet } from "react-router-dom";
import HackathonNavbar from "./HackathonNavbar";
const HackathonMain = () => {
  const chat = useSelector((store) => store.chat);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 relative">
        {chat ? (
          <ChatWindow chat={chat} />
        ) : (
          <>
            <HackathonNavbar />
            <Outlet />
          </>
        )}
      </div>
    </>
  );
};

export default HackathonMain;
