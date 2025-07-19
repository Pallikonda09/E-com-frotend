// src/components/dashboard/StatCard.jsx
const StatCard = ({ icon, title, count, bg }) => (
  <div className={`p-5 rounded-xl shadow ${bg} text-gray-800`}>
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-full shadow text-lg">{icon}</div>
      <div>
        <h3 className="font-bold">{title}</h3>
        {count !== undefined && <p className="text-sm">{count} total</p>}
      </div>
    </div>
  </div>
);

export default StatCard;
