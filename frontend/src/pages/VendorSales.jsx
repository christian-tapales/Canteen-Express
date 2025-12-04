import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const VendorSales = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const metrics = [
    { label: 'Gross Revenue', value: '₱150,000.00', icon: '💰' },
    { label: 'Total Orders', value: '2,500', icon: '📦' },
    { label: 'Average Value', value: '₱60.00', icon: '💵' },
    { label: 'Items', value: '₱1000', icon: '📊' },
    { label: 'Items Sold', value: '₱1000', icon: '🛒' }
  ];

  const bestSelling = [
    { name: 'Lumpia Shanghai', quantity: 80 },
    { name: 'Chicken Curry', quantity: 65 },
    { name: 'Bottled Water', quantity: 58 },
    { name: 'Beef Caldereta', quantity: 52 },
    { name: 'Graham Bars', quantity: 48 }
  ];

  const transactions = [
    { id: '#001', date: 'Nov 15, 2023', time: '10:30 AM', total: '₱180.00', payment: 'Cash', status: 'Completed', email: 'customer1@email.com' },
    { id: '#002', date: 'Nov 15, 2023', time: '11:15 AM', total: '₱95.00', payment: 'GCash', status: 'Completed', email: 'customer2@email.com' },
    { id: '#003', date: 'Nov 15, 2023', time: '12:00 PM', total: '₱250.00', payment: 'Cash', status: 'Completed', email: 'customer3@email.com' },
    { id: '#004', date: 'Nov 15, 2023', time: '01:20 PM', total: '₱120.00', payment: 'GCash', status: 'Completed', email: 'customer4@email.com' },
    { id: '#005', date: 'Nov 15, 2023', time: '02:45 PM', total: '₱75.00', payment: 'Cash', status: 'Completed', email: 'customer5@email.com' },
    { id: '#006', date: 'Nov 15, 2023', time: '03:30 PM', total: '₱200.00', payment: 'GCash', status: 'Pending', email: 'customer6@email.com' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <nav className="shadow-md" style={{ backgroundColor: '#FBCA30', padding: '1rem 0' }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#8C343A' }}
            >
              <span className="text-2xl">🍽️</span>
            </div>
            <span className="text-xl font-bold" style={{ color: '#8C343A' }}>
              Canteen Express - Vendor
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg font-semibold transition-all hover:opacity-90 shadow-sm"
            style={{ 
              backgroundColor: '#8C343A',
              color: '#FFFFFF'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-73px)]">
          <div className="p-4">
            <nav className="space-y-2">
              <Link to="/vendor/dashboard" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Dashboard
              </Link>
              <Link to="/vendor/orders" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Orders
              </Link>
              <Link to="/vendor/store" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Store
              </Link>
              <Link to="/vendor/menu" className="block py-2 px-4 rounded-lg font-semibold text-[#8C343A] hover:bg-[#FFF9E6] transition-colors">
                Food Menu
              </Link>
              <Link to="/vendor/sales" className="block py-2 px-4 rounded-lg font-semibold bg-[#8C343A] text-white">
                Sales Report
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#8C343A]">Sales Report</h2>
          </div>

          {/* Revenue Metrics Grid */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 text-center shadow-md">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-[#8C343A] mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Filters Section */}
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 mb-8 shadow-md">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <input
                  type="text"
                  defaultValue="Nov 1, 2023 - Nov 30, 2023"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8C343A]"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8C343A]"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Shop</label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8C343A]">
                  <option>Main Canteen</option>
                  <option>Canteen 1</option>
                  <option>Canteen 2</option>
                </select>
              </div>
              <button className="px-6 py-2 bg-white border-2 border-[#8C343A] text-[#8C343A] font-semibold rounded-lg hover:bg-[#FFF9E6] transition-colors shadow-sm">
                Apply Filters
              </button>
              <button className="px-6 py-2 text-white font-semibold rounded-lg transition-all hover:opacity-90 shadow-sm" style={{ backgroundColor: '#8C343A' }}>
                Print Report
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Sales Overview Chart */}
            <div className="col-span-2 bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#8C343A] mb-4">Sales Overview</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full h-full bg-[#FFF9E6] rounded-lg flex items-center justify-center border-2 border-dashed border-[#8C343A]">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-600">Revenue Trend Chart</p>
                    <p className="text-sm text-gray-500 mt-1">Line graph showing daily/weekly revenue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Selling Items */}
            <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#8C343A] mb-4">Top 5 Best-Selling Items</h3>
              <ul className="space-y-3">
                {bestSelling.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: '#10B981' }}>
                      {item.quantity} sold
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Transaction History Table */}
          <div className="bg-white border-2 border-[#8C343A] rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-[#8C343A] mb-4">Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#8C343A]" style={{ backgroundColor: '#FBCA30' }}>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Order ID</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Date</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Time</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Total</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Payment Method</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Status</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#8C343A]">Customer Email</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-[#FFF9E6] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#8C343A]">{transaction.id}</td>
                      <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
                      <td className="py-3 px-4 text-gray-700">{transaction.time}</td>
                      <td className="py-3 px-4 font-semibold text-[#8C343A]">{transaction.total}</td>
                      <td className="py-3 px-4 text-gray-700">{transaction.payment}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{transaction.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorSales;
