

import {
  Outlet,
  useLocation,
} from "react-router-dom";

import bgImage from "../assets/college.jpg";

export default function MainLayout() {

  const location =
    useLocation();

  const isHome =
   

export default function MainLayout() {

  const location =
    useLocation();

  const isHome =
    location.pathname === "/";

  return (

    <div
      style={{
        minHeight:
          "100vh",

        backgroundImage:
          isHome
            ? "none"
            : `linear-gradient(
                rgba(255,255,255,0.02),
                rgba(255,255,255,0.02)
              ),
              url(${bgImage})`,

        backgroundSize:
          "cover",

        backgroundPosition:
          "center",

        backgroundRepeat:
          "no-repeat",

        backgroundAttachment:
          "fixed",
      }}
    >

      <Outlet />

    </div>
  );
}