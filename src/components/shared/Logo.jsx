/* eslint-disable react/prop-types */
import React from 'react';
import { logo, logoWhite } from '../../assets';

function Logo({ width, height, white }) {
  return (
    <img src={white ? logoWhite : logo} style={{ width, height }} className="app-logo app-logo-mt-5" alt="logo" />
  );
}

Logo.defaultProps = {
  with: 100,
  height: 100,
};

export default Logo;
