import React from 'react';
import PropTypes from 'prop-types';
import style from './button.module.scss';

function EcoButton({ onClick, children }) {
  return (
    <button className={style.btn} onClick={onClick}>
      {children}
    </button>
  );
}

EcoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default EcoButton;
