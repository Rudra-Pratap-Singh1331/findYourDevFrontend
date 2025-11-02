import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import { Outlet } from "react-router-dom";
import HackathonNavbar from "./HackathonNavbar";

const HackathonMain = () => {
  const chat = useSelector((store) => store.chat);
  return (
    <div className="flex-1 overflow-y-auto min-h-screen bg-[#1e1e1e]">
      <HackathonNavbar />
      <div className="p-4 sm:p-6 lg:p-8">
        {chat ? <ChatWindow chat={chat} /> : <Outlet />}
      </div>
    </div>
  );
};

export default HackathonMain;
