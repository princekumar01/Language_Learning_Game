import { Navigate } from "react-router-dom";
import { useAppContext } from "@/providers/context";
export const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) return <Navigate to="/signin" />;
  return children;
};
