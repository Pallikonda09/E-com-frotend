// src/components/dashboard/UserInfoCard.jsx
import { LogOut } from "lucide-react";

const UserInfoCard = ({ user, onLogout }) => (
  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Welcome, <span className="text-indigo-600">{user.name}</span> 👋
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
    </div>
    <button
      onClick={onLogout}
      className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  </div>
);

export default UserInfoCard;
