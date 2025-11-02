import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import SignUp from "./components/authComponent/SignUp";
import Login from "./components/authComponent/Login";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { ToastContainer } from "react-toastify";
import UpdateProfile from "./components/UserProfile/Profile";
import MainComponent from "./components/MainComponent";
import Devs from "./components/Devs";
import CreatePost from "./components/CreatePost";
import DefaultProfile from "./components/UserProfile/DefaultProfile";
import UpdatePasswordSendOTP from "./components/UpdatePasswordSendOTP";
import HackathonMain from "./components/HackathonMain";
import CreateHackathon from "./components/CreateHackathon";
import HackathonPostContainer from "./components/HackathonPostContainer";
import HackathonPostedContainer from "./components/HackathonPostedContainer";
import AppliedHackathonCard from "./components/AppliedHackathonCard";
import HackathonAppliedContainer from "./components/HackathonAppliedContainer";
import JoinedHackathons from "./components/JoineHackathons";
import GroupedChat from "./components/GroupedChat";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/updateprofile",
      element: <UpdateProfile />,
    },
    {
      path: "/profile",
      element: <DefaultProfile />,
    },
    {
      path: "/updatepassword",
      element: <UpdatePasswordSendOTP />,
    },
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainComponent />,
        },
        {
          path: "/devs",
          element: <Devs />,
        },
        {
          path: "/createPost",
          element: <CreatePost />,
        },
        {
          path: "/hackathons",

          element: <HackathonMain />,
          children: [
            {
              path: "/hackathons",
              element: <HackathonPostContainer />,
            },
            {
              path: "/hackathons/createhackathon",
              element: <CreateHackathon />,
            },
            {
              path: "/hackathons/postedhackathon",
              element: <HackathonPostedContainer />,
            },
            {
              path: "/hackathons/appliedhackathons",
              element: <HackathonAppliedContainer />,
            },
            {
              path: "/hackathons/joinedhackathons",
              element: <JoinedHackathons />,
            },
            {
              path: "/hackathons/chat",
              element: <GroupedChat />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={500} />
      </Provider>
    </>
  );
};

export default App;
