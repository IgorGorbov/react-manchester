import React from 'react';
import { CityLogo } from '../ui/icons';

const Footer = () => (
  <footer className="bck_blue">
    <div className="footer_logo">
      <CityLogo width="70px" height="70px" link linkTo="/" />
    </div>
    <div className="footer_discl">
      Manchester city 2018. All right reserved.
    </div>
  </footer>
);

export default Footer;
