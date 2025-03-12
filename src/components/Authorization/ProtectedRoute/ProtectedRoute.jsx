// import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import CurrentUserContext from "../../../contexts/CurrentUserContext"; // ✅ Corrected relative path

// const ProtectedRoute = () => {
//   const { currentUser } = useContext(CurrentUserContext);
//   const isLoggedIn = !!currentUser;

//   console.log("🔍 Checking access. isLoggedIn:", isLoggedIn);

//   return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  console.log("🔍 [ProtectedRoute] Checking Access. isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    console.warn("🔒 [ProtectedRoute] Access Denied. Redirecting to '/'");
    return <Navigate to="/" replace />;
  }

  console.log("✅ [ProtectedRoute] Access Granted!");
  return <Outlet />;
};

export default ProtectedRoute;
