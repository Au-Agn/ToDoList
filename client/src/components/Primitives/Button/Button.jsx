import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={'submit' || props.type}
      className={props.className}
    >{props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
