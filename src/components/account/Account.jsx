import React, { useState } from 'react';
import { User, Package, MapPin, LogOut, Camera } from 'lucide-react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h3>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative group cursor-pointer">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-50"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-md text-sm font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="text-gray-500 mt-1">Start shopping to see your orders here.</p>
              <button className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                Start Shopping
              </button>
            </div>
          </div>
        );
      case 'addresses':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No addresses saved</h3>
              <p className="text-gray-500 mt-1">Add an address for faster checkout.</p>
              <button className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                Add Address
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'profile'
                      ? 'bg-gray-50 text-red-500 border-l-4 border-red-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`}
                >
                  <User className="w-5 h-5" />
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'orders'
                      ? 'bg-gray-50 text-red-500 border-l-4 border-red-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`}
                >
                  <Package className="w-5 h-5" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'addresses'
                      ? 'bg-gray-50 text-red-500 border-l-4 border-red-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`}
                >
                  <MapPin className="w-5 h-5" />
                  Addresses
                </button>
                <div className="h-px bg-gray-100 my-2"></div>
                <button className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
