// // src/components/PrivateRoute.jsx
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const token = useSelector((state) => state.auth.token);

//   return token ? children : <Navigate to="/otp-login" replace />;
// };

// export default PrivateRoute;


import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
 return user ? children : <Navigate to="/login" state={{ from: location.pathname }} />

};

export default PrivateRoute;

