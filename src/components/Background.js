// src/components/Background.js
import React from 'react';
import useAsciiBackground from '../hooks/useAsciiBackground';

const Background = () => {
  useAsciiBackground();

  return <div id="Background"  />;
};

export default Background;
