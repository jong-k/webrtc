import { createBrowserRouter } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";

export const router = createBrowserRouter([
  {
    path: "/",
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
]);
