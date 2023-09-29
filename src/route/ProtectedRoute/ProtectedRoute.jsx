import Error404 from "component/shared/Error404/Error404";
import Loading from "component/shared/Loading/Loading";
import { useAuth } from "contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, authorization = [], redirect }) {
  const { userAuth } = useAuth();
  const { data } = userAuth.data;

  if (authorization.includes("ANONYMOUS") && userAuth.failureCount > 1)
    return <>{children}</>;

  if (userAuth.isFetching) return <Loading />;

  const authorized = authorization
    .map((item) => data.role.includes(item.toUpperCase()))
    .includes(true);

  return authorized ? (
    <>{children}</>
  ) : redirect ? (
    <Navigate to={redirect} />
  ) : (
    <Error404 />
  );
}

export default ProtectedRoute;
