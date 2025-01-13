import React from "react";
import { 
  DollarSign, 
  AlertCircle, 
  Trophy, 
  Clock, 
  UserMinus, 
  CalendarX,
  ArrowRight 
} from "lucide-react";

const OverallCalculation = ({ baseSalary, bonuses, deductions }) => {
  const {
    lateCheckinsTotalDeduction,
    totalHalfDayDeduction,
    totalAbsentDayDeduction,
  } = deductions;
  
  const totalDeductions = 
    lateCheckinsTotalDeduction + totalHalfDayDeduction + totalAbsentDayDeduction;
  const finalSalary = baseSalary + bonuses - totalDeductions;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <DollarSign className="w-7 h-7 text-indigo-400" />
        Salary Overview
      </h2>

      <div className="space-y-6">
        {/* Base Salary */}
        <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/10 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-200 font-medium">Base Salary</p>
                <p className="text-xs text-gray-400">Monthly base compensation</p>
              </div>
            </div>
            {/* <span className="text-lg font-semibold text-white">₹{baseSalary.toLocaleString()}</span> */}
          </div>
        </div>

        {/* Bonuses */}
        <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/10 p-2 rounded-lg">
                <Trophy className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-200 font-medium">Bonuses</p>
                <p className="text-xs text-gray-400">Performance rewards</p>
              </div>
            </div>
            {/* <span className="text-lg font-semibold text-green-400">+₹{bonuses.toLocaleString()}</span> */}
          </div>
        </div>

        {/* Deductions Section */}
        <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
          <h3 className="text-gray-300 font-medium mb-4">Deductions</h3>
          
          {/* Late Check-ins */}
          <div className="flex justify-between items-center pl-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-gray-300">Late Check-ins</span>
            </div>
            {/* <span className="text-red-400 font-medium">-₹{lateCheckinsTotalDeduction.toLocaleString()}</span> */}
          </div>

          {/* Half-Day */}
          <div className="flex justify-between items-center pl-2">
            <div className="flex items-center gap-2">
              <UserMinus className="w-4 h-4 text-red-400" />
              <span className="text-gray-300">Half-Days</span>
            </div>
            {/* <span className="text-red-400 font-medium">-₹{totalHalfDayDeduction.toLocaleString()}</span> */}
          </div>

          {/* Absent Days */}
          <div className="flex justify-between items-center pl-2">
            <div className="flex items-center gap-2">
              <CalendarX className="w-4 h-4 text-red-400" />
              <span className="text-gray-300">Absences</span>
            </div>
            {/* <span className="text-red-400 font-medium">-₹{totalAbsentDayDeduction.toLocaleString()}</span> */}
          </div>
        </div>

        {/* Final Salary */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 rounded-lg mt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-6 h-6 text-white" />
              <div>
                <p className="text-gray-200 text-sm">Final Salary</p>
                {/* <p className="text-white text-2xl font-bold">₹{finalSalary.toLocaleString()}</p> */}
              </div>
            </div>
            <div className="bg-indigo-500/20 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallCalculation;