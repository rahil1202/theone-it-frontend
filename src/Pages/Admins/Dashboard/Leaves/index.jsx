import React, { useState } from 'react';
import { NotebookTabsIcon, Calendar, Mail, AlertCircle, Check, X, Clock, Search, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';

const AdminLeaveManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // ... rest of the state and helper functions remain the same ...
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      reason: "Family vacation planned with parents",
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      status: "pending",
      department: "Engineering"
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@company.com",
      reason: "Medical appointment and recovery",
      startDate: "2025-01-12",
      endDate: "2025-01-14",
      status: "accepted",
      department: "Marketing"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      reason: "Personal emergency",
      startDate: "2025-01-18",
      endDate: "2025-01-19",
      status: "declined",
      department: "Sales"
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
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

  const filteredAndSortedRequests = leaveRequests
    .filter(request => {
      const matchesSearch = 
        request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.reason.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.startDate) - new Date(a.startDate);
      } else {
        return new Date(a.startDate) - new Date(b.startDate);
      }
    });

  return (
    <div className="ml-20 p-6 min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <NotebookTabsIcon className="w-8 h-8 text-indigo-500" />
              <h1 className="text-2xl font-bold">Leave Management</h1>
            </div>
            <p className="text-gray-400 hidden md:block">
              {filteredAndSortedRequests.length} leave requests pending review
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search requests..."
                className="pl-9 pr-4 py-2 w-full bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="w-40 px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isStatusOpen && (
                <div className="absolute top-full mt-2 w-40 bg-gray-900 rounded-lg ring-1 ring-white/10 py-1 z-10">
                  {['all', 'pending', 'accepted', 'declined'].map((status) => (
                    <button
                      key={status}
                      className="w-full px-4 py-2 text-left hover:bg-gray-800"
                      onClick={() => {
                        setStatusFilter(status);
                        setIsStatusOpen(false);
                      }}
                    >
                      {status === 'all' ? 'All Status' : status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Order */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-40 px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isSortOpen && (
                <div className="absolute top-full mt-2 w-40 bg-gray-900 rounded-lg ring-1 ring-white/10 py-1 z-10">
                  {['newest', 'oldest'].map((sort) => (
                    <button
                      key={sort}
                      className="w-full px-4 py-2 text-left hover:bg-gray-800"
                      onClick={() => {
                        setSortOrder(sort);
                        setIsSortOpen(false);
                      }}
                    >
                      {sort === 'newest' ? 'Newest First' : 'Oldest First'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Leave Requests List */}
          <div className="space-y-4">
            {filteredAndSortedRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-800/30 rounded-xl p-6 ring-1 ring-white/10 hover:ring-indigo-500/50 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{request.name}</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{request.email}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {request.department}
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-300">{request.reason}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
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

                  <div className="flex flex-col sm:flex-row lg:flex-col justify-start gap-3">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ring-1 ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(request.id, 'accepted')}
                          className="px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg ring-1 ring-emerald-500/30 transition-all duration-300"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'declined')}
                          className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg ring-1 ring-red-500/30 transition-all duration-300"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredAndSortedRequests.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No leave requests match your search criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveManagement;