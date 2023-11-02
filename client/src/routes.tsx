import { createBrowserRouter } from "react-router-dom";
import IntroductionPage from "./pages/IntroductionPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroductionPage />,
  },
  {
    path: "/join-room",
    element: <JoinRoomPage />,
  },
  {
    path: "/room",
    element: <RoomPage />,
  },
]);
