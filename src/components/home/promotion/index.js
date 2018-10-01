import React from 'react';
import Enroll from './Enroll';
import Animation from './Animation';

const Promotion = () => (
  <div className="promotion_wrapper" style={{ background: '#fff' }}>
    <div className="container">
      <Animation />
      <Enroll />
    </div>
  </div>
);

export default Promotion;
