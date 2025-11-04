import React, { Suspense } from "react";
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
// import CreateHackathon from "./components/CreateHackathon";
// import HackathonPostContainer from "./components/HackathonPostContainer";
// import HackathonPostedContainer from "./components/HackathonPostedContainer";
import AppliedHackathonCard from "./components/AppliedHackathonCard";
// import HackathonAppliedContainer from "./components/HackathonAppliedContainer";
// import JoinedHackathons from "./components/JoineHackathons";
import GroupedChat from "./components/GroupedChat";
import HackathonPostCardShimmer from "./components/HackathonPostCardShimmer";

const HackathonPostContainer = React.lazy(() =>
  import("./components/HackathonPostContainer")
);
const CreateHackathon = React.lazy(() =>
  import("./components/CreateHackathon")
);

const HackathonPostedContainer = React.lazy(() =>
  import("./components/HackathonPostedContainer")
);

const HackathonAppliedContainer = React.lazy(() =>
  import("./components/HackathonAppliedContainer")
);

const JoinedHackathons = React.lazy(() =>
  import("./components/JoineHackathons")
);
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
              element: (
                <Suspense fallback={<HackathonPostCardShimmer />}>
                  <HackathonPostContainer />
                </Suspense>
              ),
            },
            {
              path: "/hackathons/createhackathon",
              element: (
                <Suspense
                  fallback={
                    <div className="text-center text-gray-500">loading....</div>
                  }
                >
                  <CreateHackathon />
                </Suspense>
              ),
            },
            {
              path: "/hackathons/postedhackathon",
              element: (
                <Suspense
                  fallback={
                    <div className="text-center text-gray-500">loading....</div>
                  }
                >
                  <HackathonPostedContainer />
                </Suspense>
              ),
            },
            {
              path: "/hackathons/appliedhackathons",
              element: (
                <Suspense
                  fallback={
                    <div className="text-center text-gray-500">loading....</div>
                  }
                >
                  <HackathonAppliedContainer />
                </Suspense>
              ),
            },
            {
              path: "/hackathons/joinedhackathons",
              element: (
                <Suspense
                  fallback={
                    <div className="text-center text-gray-500">loading....</div>
                  }
                >
                  <JoinedHackathons />
                </Suspense>
              ),
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
      </Provider>
      <ToastContainer position="top-right" autoClose={500} />
    </>
  );
};

export default App;
