import React, { useState } from 'react';
import { users } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { Plus, Users, Shield, Building2, Settings, ToggleLeft } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('users');
  const [userList] = useState(users);

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const roles = [
    { name: 'Quality Director', permissions: ['Review Reports', 'Approve Actions', 'Full Access'] },
    { name: 'R&D Manager', permissions: ['Create Batches', 'Review Data', 'Manage Projects'] },
    { name: 'Production Supervisor', permissions: ['Create Batches', 'Update Status', 'View Reports'] },
    { name: 'Quality Analyst', permissions: ['View Reports', 'Create Documents', 'Limited Approval'] },
    { name: 'Technician', permissions: ['Record Data', 'View Instructions', 'Report Issues'] }
  ];

  const departments = [
    { name: 'Production', users: 12 },
    { name: 'Quality Assurance', users: 8 },
    { name: 'Research & Development', users: 6 },
    { name: 'Operations', users: 5 },
    { name: 'Administration', users: 3 }
  ];

  const systemSettings = [
    { label: 'E-Signatures', description: 'Enable digital signatures on documents', enabled: true },
    { label: 'Audit Trail', description: 'Log all system activities', enabled: true },
    { label: 'Password Policy', description: 'Enforce strong password requirements', enabled: true },
    { label: 'Session Timeout', description: 'Auto logout after 30 minutes', enabled: false },
    { label: 'Two-Factor Authentication', description: 'Require 2FA for all users', enabled: true },
    { label: 'Mobile Access', description: 'Allow access from mobile devices', enabled: false }
  ];

  const getDepartmentForUser = (userId) => {
    const deptMap = {
      '1': 'Production',
      '2': 'Quality Assurance',
      '3': 'R&D',
      '4': 'Operations',
      '5': 'Production'
    };
    return deptMap[userId] || 'Administration';
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eqms-text mb-2">Administration</h1>
            <p className="text-eqms-text-secondary">Manage users, roles, and system settings</p>
          </div>
          {activeTab === 'users' && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={20} />
              Add User
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-eqms-border overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-eqms-text-secondary hover:text-eqms-text'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-eqms-card border border-eqms-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-eqms-dark border-b border-eqms-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-eqms-border">
                  {userList.map((user) => (
                    <tr key={user.id} className="hover:bg-eqms-dark/50 transition-colors">
                      <td className="px-6 py-4 text-eqms-text font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-eqms-text text-sm">{user.role}</td>
                      <td className="px-6 py-4 text-eqms-text-secondary text-sm">{getDepartmentForUser(user.id)}</td>
                      <td className="px-6 py-4 text-eqms-text-secondary text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="bg-eqms-card border border-eqms-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-eqms-text mb-4">{role.name}</h3>
                <div className="space-y-2">
                  {role.permissions.map((permission, pIndex) => (
                    <div key={pIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-eqms-text-secondary text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full bg-eqms-dark border border-eqms-border hover:border-eqms-accent text-eqms-text text-sm py-2 rounded transition-colors">
                  Edit Role
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="bg-eqms-card border border-eqms-border rounded-lg overflow-hidden">
            <div className="divide-y divide-eqms-border">
              {departments.map((dept, index) => (
                <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-eqms-dark/50 transition-colors">
                  <div>
                    <h3 className="text-eqms-text font-medium">{dept.name}</h3>
                    <p className="text-eqms-text-secondary text-sm mt-1">{dept.users} members</p>
                  </div>
                  <button className="px-4 py-2 bg-eqms-dark border border-eqms-border hover:border-eqms-accent text-eqms-text text-sm rounded transition-colors">
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {systemSettings.map((setting, index) => (
              <div key={index} className="bg-eqms-card border border-eqms-border rounded-lg p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-eqms-text font-medium">{setting.label}</h3>
                  <p className="text-eqms-text-secondary text-sm mt-1">{setting.description}</p>
                </div>
                <button
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors flex-shrink-0 ml-4 ${
                    setting.enabled ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
