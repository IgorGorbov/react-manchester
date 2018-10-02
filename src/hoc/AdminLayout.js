import React from 'react';
import PropTypes from 'prop-types';
import AdminNav from '../components/admin/nav/AdminNav';

const AdminLayout = ({ children }) => (
  <div className="admin_container">
    <div className="admin_left_nav">
      <AdminNav />
    </div>
    <div className="admin_right">{children}</div>
  </div>
);

AdminLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object,
  ]),
};

AdminLayout.defaultProps = {
  children: null,
};

export default AdminLayout;
