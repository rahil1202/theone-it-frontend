import React from "react";
import { DollarSign } from "lucide-react";

const InfoCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 transition-all">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-200">{value || "Not Provided"}</p>
    </div>
  </div>
);

const SalaryTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <InfoCard
          icon={DollarSign}
          label="Monthly Salary"
          value="₹50,000"
          color="bg-green-500/10 text-green-400"
        />
        <InfoCard
          icon={DollarSign}
          label="Yearly Bonus"
          value="₹1,00,000"
          color="bg-blue-500/10 text-blue-400"
        />
        <InfoCard
          icon={DollarSign}
          label="Deductions"
          value="₹5,000"
          color="bg-red-500/10 text-red-400"
        />
      </div>
    </div>
  );
};

export default SalaryTab;
