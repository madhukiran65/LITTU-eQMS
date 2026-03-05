import React, { useState } from 'react';
import { trainingCourses } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { BookOpen, Award, Users, AlertCircle, Plus, Search } from 'lucide-react';

export default function Training() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Calculate statistics
  const totalCourses = trainingCourses.length;
  const activeCourses = trainingCourses.filter(c => c.status === 'active').length;
  const complianceRate = 94.2;
  const overdueAssignments = trainingCourses.reduce((acc, course) =>
    acc + (course.assignments?.filter(a => a.dueStatus === 'overdue').length || 0), 0
  );

  // Filter courses
  const filteredCourses = trainingCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || course.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    const colors = {
      classroom: 'bg-blue-900 text-blue-200 border-blue-700',
      online: 'bg-purple-900 text-purple-200 border-purple-700',
      practical: 'bg-green-900 text-green-200 border-green-700'
    };
    return colors[type] || colors.online;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-eqms-text">Training Management</h1>
        <button className="flex items-center gap-2 bg-eqms-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
          <Plus size={20} />
          Create Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Total Courses</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{totalCourses}</p>
            </div>
            <BookOpen size={40} className="text-eqms-accent opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Active</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{activeCourses}</p>
            </div>
            <Award size={40} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Compliance Rate</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{complianceRate}%</p>
            </div>
            <Users size={40} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Overdue</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{overdueAssignments}</p>
            </div>
            <AlertCircle size={40} className="text-red-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-3 text-eqms-text-secondary" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-eqms-card border border-eqms-border rounded-lg pl-10 pr-4 py-2 text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-eqms-card border border-eqms-border rounded-lg px-4 py-2 text-eqms-text focus:outline-none focus:border-eqms-accent"
        >
          <option value="all">All Types</option>
          <option value="classroom">Classroom</option>
          <option value="online">Online</option>
          <option value="practical">Practical</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-eqms-card border border-eqms-border rounded-lg p-6 hover:border-eqms-accent transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-eqms-text flex-1">{course.title}</h3>
              <span className={`text-xs font-semibold px-3 py-1 rounded border ${getTypeColor(course.type)}`}>
                {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
              </span>
            </div>

            <p className="text-eqms-text-secondary text-sm mb-4">{course.description}</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-eqms-text-secondary">Enrollment</span>
                  <span className="text-eqms-text font-medium">{course.enrolled}/{course.capacity}</span>
                </div>
                <div className="w-full bg-eqms-dark rounded-full h-2">
                  <div
                    className="bg-eqms-accent rounded-full h-2 transition"
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-eqms-text-secondary">Pass Rate</span>
                  <span className="text-eqms-text font-medium">{course.passRate}%</span>
                </div>
                <div className="w-full bg-eqms-dark rounded-full h-2">
                  <div
                    className={`rounded-full h-2 transition ${
                      course.passRate >= 80 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${course.passRate}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-eqms-border">
                <span className="text-sm text-eqms-text-secondary">Duration</span>
                <span className="text-sm font-medium text-eqms-text">{course.duration} hours</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-eqms-text-secondary">Completed</span>
                <span className="text-sm font-medium text-eqms-text">{course.completed}</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-eqms-accent hover:bg-blue-600 text-white py-2 rounded-lg transition text-sm font-medium">
              View Course
            </button>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-eqms-text-secondary">No courses found matching your criteria</p>
        </div>
      )}

      {/* Quiz Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-eqms-text mb-4">Assessment Preview</h2>
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-eqms-accent rounded-lg flex items-center justify-center">
              <Award size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-eqms-text">ISO 9001:2015 Fundamentals Quiz</h3>
              <p className="text-sm text-eqms-text-secondary">Part of: Quality Management Essentials</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-eqms-text">20</p>
              <p className="text-sm text-eqms-text-secondary">Questions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-eqms-text">30</p>
              <p className="text-sm text-eqms-text-secondary">Minutes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-eqms-text">75%</p>
              <p className="text-sm text-eqms-text-secondary">Pass Score</p>
            </div>
          </div>
          <button className="w-full mt-4 border border-eqms-accent hover:bg-eqms-accent/10 text-eqms-accent py-2 rounded-lg transition font-medium">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
