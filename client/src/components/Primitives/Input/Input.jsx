import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    return (
      <input
        type={'text' || this.props.type}
        onChange={this.props.onChange}
        className={this.props.className}
        value={this.props.value}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default Input;
