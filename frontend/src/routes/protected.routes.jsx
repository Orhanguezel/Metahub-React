import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchCurrentUser } from "@/modules/users/slice/accountSlice";

const ProtectedRoute = ({ children, role = "user" }) => {
  const { profile, loading, error } = useSelector(state => state.account);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!profile && !loading && !error) {
      console.log("Dispatch fetchCurrentUser");
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, profile, loading, error]);

  console.log("[ProtectedRoute] profile:", profile, "loading:", loading, "error:", error);

  if (loading || (!profile && !error)) {
    return <div style={{ color: "#FFC107", textAlign: "center", margin: "2em 0" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center", margin: "2em 0" }}>{error}</div>;
  }

  if (!profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === "admin" && profile.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
export { ProtectedRoute };
