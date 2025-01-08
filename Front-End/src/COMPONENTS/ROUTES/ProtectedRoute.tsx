import { Navigate } from "react-router-dom";
import { ComponentProps } from "react";

interface ProtectedRouteProps extends ComponentProps<any> {
  isAuthenticated: boolean;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  element,
  ...rest
}) => {
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
