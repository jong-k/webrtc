import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IntroPage from "./pages/IntroPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";
import TestWebCamPage from "./pages/TestWebCamPage";
import TestShareWebCamPage from "./pages/TestShareWebCamPage";
import TestExchangeDataPage from "./pages/TestExchangeDataPage";
// import TestAnotherBrowserDataPage from "./pages/TestAnotherBrowserDataPage";
import TestSignalingPage from "./pages/TestSignalingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/intro",
    element: <IntroPage />,
  },
  {
    path: "/join-room",
    element: <JoinRoomPage />,
  },
  {
    path: "/room",
    element: <RoomPage />,
  },
  {
    path: "/testwebcam",
    element: <TestWebCamPage />,
  },
  {
    path: "/testsharewebcam",
    element: <TestShareWebCamPage />,
  },
  {
    path: "/testexchangedata",
    element: <TestExchangeDataPage />,
  },
  {
    path: "/testsignaling",
    element: <TestSignalingPage />,
  },
  // {
  //   path: "/testanotherbrowser",
  //   element: <TestAnotherBrowserDataPage />,
  // },
]);
