import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Layout;
