// src/pages/Dashboard.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return user ? (
    <DashboardLayout user={user} onLogout={handleLogout} />
  ) : null;
};

export default Dashboard;
