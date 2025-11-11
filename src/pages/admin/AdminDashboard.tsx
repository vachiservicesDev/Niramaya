import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="overview">Platform Overview</Link></li>
          <li><Link to="user-provider-management">User & Provider Management</Link></li>
          <li><Link to="content-service-management">Content & Service Management</Link></li>
          <li><Link to="compliance-security">Compliance & Security</Link></li>
          <li><Link to="analytics-reporting">Analytics & Reporting</Link></li>
          <li><Link to="workflow-automation">Workflow Automation</Link></li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
