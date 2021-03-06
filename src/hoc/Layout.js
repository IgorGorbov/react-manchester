import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';

const Layout = ({ children, user }) => (
  <div>
    <Header user={user} />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
};
Layout.defaultProps = {
  user: null,
};
export default Layout;
