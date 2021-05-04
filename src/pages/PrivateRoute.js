import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks";

export const PrivateRoute = (props) => {
  const { isUserLoggedIn } = useAuth();

  return (
    <>
      {isUserLoggedIn ? (
        <Route {...props} />
      ) : (
        <Navigate
          state={{
            from: props.path
          }}
          replace
          to="/login"
        />
      )}
    </>
  );
};