import React, { useState } from 'react';
import { NotebookTabsIcon, Calendar, AlertCircle, Plus, Clock, X, Check, ChevronDown, CalendarRange } from 'lucide-react';

const Leaves = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'vacation'
  });

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      reason: "Family vacation planned with parents",
      type: "vacation",
      status: "pending",
      submittedAt: "2025-01-01"
    },
    {
      id: 2,
      startDate: "2025-02-10",
      endDate: "2025-02-11",
      reason: "Medical appointment",
      type: "sick",
      status: "accepted",
      submittedAt: "2025-01-15"
    },
    {
      id: 3,
      startDate: "2025-03-05",
      endDate: "2025-03-05",
      reason: "Personal errands",
      type: "personal",
      status: "declined",
      submittedAt: "2025-02-20"
    }
  ]);

  const handleNewRequest = (e) => {
    e.preventDefault();
    const request = {
      id: leaveRequests.length + 1,
      ...newRequest,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setLeaveRequests([request, ...leaveRequests]);
    setNewRequest({
      startDate: '',
      endDate: '',
      reason: '',
      type: 'vacation'
    });
    setIsModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30';
      case 'declined':
        return 'bg-red-500/10 text-red-400 ring-red-500/30';
      default:
        return 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <Check className="w-4 h-4" />;
      case 'declined':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'vacation':
        return 'bg-blue-500/10 text-blue-400 ring-blue-500/30';
      case 'sick':
        return 'bg-purple-500/10 text-purple-400 ring-purple-500/30';
      case 'personal':
        return 'bg-orange-500/10 text-orange-400 ring-orange-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 ring-gray-500/30';
    }
  };

  return (
    <div className="ml-20 min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <header className="border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <NotebookTabsIcon className="w-8 h-8 text-indigo-500" />
              <h1 className="text-2xl font-bold">My Leave Requests</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Request
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
          {/* Leave Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/30 rounded-xl p-4 ring-1 ring-white/10">
              <div className="text-gray-400 text-sm">Annual Leave Balance</div>
              <div className="text-2xl font-bold mt-1">10 days</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 ring-1 ring-white/10">
              <div className="text-gray-400 text-sm">Holidays</div>
              <div className="text-2xl font-bold mt-1">10 days</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 ring-1 ring-white/10">
              <div className="text-gray-400 text-sm">Pending Requests</div>
              <div className="text-2xl font-bold mt-1">
                {leaveRequests.filter(req => req.status === 'pending').length}
              </div>
            </div>
          </div>

          {/* Leave Requests List */}
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-800/30 rounded-xl p-6 ring-1 ring-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ring-1 ${getLeaveTypeColor(request.type)}`}>
                        <span className="capitalize">{request.type}</span>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ring-1 ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </div>
                    </div>
                    <div className="text-gray-300">{request.reason}</div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(request.startDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })} - {new Date(request.endDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Submitted on {new Date(request.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 ring-1 ring-white/10">
            <h2 className="text-xl font-bold mb-4">New Leave Request</h2>
            <form onSubmit={handleNewRequest} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Leave Type</label>
                <select
                  value={newRequest.type}
                  onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                >
                  <option value="vacation">Vacation Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="personal">Personal Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newRequest.startDate}
                  onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={newRequest.endDate}
                  onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Reason</label>
                <textarea
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none h-24 resize-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;