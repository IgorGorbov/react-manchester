import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export const Tag = ({
  link,
  linkTo,
  background,
  color,
  fontSize,
  children,
  otherStyles,
}) => {
  const template = (
    <div
      style={{
        background,
        color,
        fontSize,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...otherStyles,
      }}
    >
      {children}
    </div>
  );

  if (link) {
    return <Link to={linkTo}>{template}</Link>;
  }
  return template;
};

Tag.propTypes = {
  link: PropTypes.bool,
  linkTo: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  children: PropTypes.string,
  otherStyles: PropTypes.object,
};

export const fireBaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });
  return data;
};

export const reverseArray = array => {
  const reversedArray = [];

  for (let i = array.length - 1; i >= 0; i -= 1) {
    reversedArray.push(array[i]);
  }

  return reversedArray;
};

export const validate = element => {
  let error = [true, ''];
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};
