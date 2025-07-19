
import UserInfoCard  from "./UserInfoCard"
import StatCard from  "./StastCard"
import RecentlyViewed from "./RecentlyViewed"
import {
  ShoppingBag,
  Heart,
  User,
  Search,
} from "lucide-react";

const DashboardLayout = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <UserInfoCard user={user} onLogout={onLogout} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard icon={<ShoppingBag />} title="Orders" count={3} bg="bg-blue-100" />
          <StatCard icon={<Heart />} title="Wishlist" count={5} bg="bg-pink-100" />
          <StatCard icon={<User />} title="Profile" bg="bg-yellow-100" />
          <StatCard icon={<Search />} title="Explore Products" bg="bg-green-100" />
        </div>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export default DashboardLayout;
