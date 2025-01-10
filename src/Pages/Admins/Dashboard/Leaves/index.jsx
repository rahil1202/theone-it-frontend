import React, { useState, useEffect } from 'react';
import {
  NotebookTabsIcon, Calendar, Mail, AlertCircle, Check, X, 
  Clock, Search, Filter, ArrowUpDown, ChevronDown, Edit,
  Loader2, User, Calendar as CalendarIcon, XCircle
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLeaveManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [newStatus, setNewStatus] = useState('pending');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchAllLeaves = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/leaves/get-all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Failed to fetch leaves.');
      const { leaves } = await response.json();
      setLeaveRequests(leaves);
      toast.success('Leaves fetched successfully');
    } catch (error) {
      console.error('Error fetching leaves:', error);
      toast.error(error.message || 'Failed to fetch leaves');
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveStatus = async () => {
    if (!currentLeave) return;
    try {
      const response = await fetch(`${BASE_URL}/leaves/update/${currentLeave._id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Invalid status update.');
      const { message } = await response.json();
      toast.success(message || 'Leave status updated successfully');
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === currentLeave._id ? { ...request, status: newStatus } : request
        )
      );
      setIsSlideOverOpen(false);
    } catch (error) {
      console.error('Error updating leave status:', error);
      toast.error(error.message || 'Failed to update leave status');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-500/20 text-emerald-400 ring-emerald-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 ring-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 ring-yellow-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Check className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredAndSortedRequests = leaveRequests
    .filter((request) => {
      const matchesSearch =
        request.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.reason.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || request.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.startDate) - new Date(a.startDate);
      }
      return new Date(a.startDate) - new Date(b.startDate);
    });

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="ml-20">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                  <NotebookTabsIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Leave Management</h1>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {filteredAndSortedRequests.length} total requests
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : filteredAndSortedRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 mb-4">
                <AlertCircle className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-300">No leave requests found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAndSortedRequests.map((request) => (
                <div
                  key={request._id}
                  className="group bg-gray-800/40 hover:bg-gray-800/60 rounded-xl ring-1 ring-white/10 hover:ring-indigo-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-gray-900/50 rounded-lg">
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                          <h3 className="font-medium text-white">{request.employeeEmail}</h3>
                        </div>
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="p-2 bg-gray-900/50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-gray-300">{request.reason}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-900/50 rounded-lg">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-400">
                            {new Date(request.startDate).toLocaleDateString()} -{' '}
                            {new Date(request.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg ring-1 ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {getStatusIcon(request.status)}
                          <span className="text-sm font-medium capitalize">{request.status}</span>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentLeave(request);
                            setNewStatus(request.status);
                            setIsSlideOverOpen(true);
                          }}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Update</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Slide-over Panel */}
      {isSlideOverOpen && currentLeave && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="w-screen max-w-md">
                <div className="flex h-full flex-col bg-gray-800 shadow-xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Update Leave Request</h2>
                    <button
                      onClick={() => setIsSlideOverOpen(false)}
                      className="rounded-lg p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Employee Email
                        </label>
                        <p className="text-white">{currentLeave.employeeEmail}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Leave Reason
                        </label>
                        <p className="text-white">{currentLeave.reason}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Status
                        </label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 px-6 py-4 border-t border-white/10">
                    <button
                      onClick={() => setIsSlideOverOpen(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={updateLeaveStatus}
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-white transition-colors duration-200"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer 
        theme="dark" 
        position="top-right" 
        pauseOnHover={false} 
        limit={1}
        closeOnClick 
        autoClose={1500} 
      />
    </div>
  );
};

export default AdminLeaveManagement;