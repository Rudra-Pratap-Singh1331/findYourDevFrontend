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
import UpdatePasswordSendOTP from "./components/updatePasswordSendOTP";
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
      ],
    },
  ]);
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={2000} />
      </Provider>
    </>
  );
};

export default App;
