import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthRouteOnly({ children }: { children: JSX.Element }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isLogged = useSelector((state: any) => state.auth.isLogged);

  if (isLogged) return children;
  else return <Navigate to="/login" />;
}

export default AuthRouteOnly;
