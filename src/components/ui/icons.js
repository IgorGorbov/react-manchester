import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import mCityLogo from '../../resources/images/logos/manchester_city_logo.png';

export const CityLogo = ({ link, linkTo, width, height }) => {
  const template = (
    <div
      className="img_cover"
      style={{ width, height, background: `url(${mCityLogo}) no-repeat` }}
    />
  );

  if (link) {
    return (
      <Link to={linkTo} className="link_logo">
        {template}
      </Link>
    );
  }
  return template;
};

CityLogo.propTypes = {
  link: PropTypes.bool.isRequired,
  linkTo: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
