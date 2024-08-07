import React from 'react';
import './sidebar.css';

const Sidebar = ({ handleSectionChange, activeSection, className }) => {
 const handleLogout =()  => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return (
    <aside className={`sidebar ${className}`}>
      <h1>Dashboard Menu</h1>
      <nav>
        <ul>
          <li>
            <a
              onClick={() => handleSectionChange('classes')}
              className={activeSection === 'classes' ? 'active' : ''}
            >
              Classes
            </a>
          </li>
          <li>
            <a
              onClick={() => handleSectionChange('forms')}
              className={activeSection === 'forms' ? 'active' : ''}
            >
              Forms
            </a>
          </li>
          <a
              onClick={() => handleLogout('logout')}
            >
              Logout
            </a>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
