import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IntroPage from "./pages/IntroPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";
import TestWebCamPage from "./pages/TestWebCamPage";

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
]);
