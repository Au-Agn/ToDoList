import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    checked: PropTypes.bool,
    id: PropTypes.string,
    onClick: PropTypes.func
  };

  handleInternalClick = () => {
    this.props.onClick(!this.props.checked);
  }

  render() {
    const showNameClass = this.props.className ? 'hide' : 'show';
    return (
      <label className={this.props.className}>
        <input
          type='checkbox'
          checked={this.props.checked}
          className={`checkbox ${showNameClass}`}
          id={this.props.id}
          onChange={this.handleInternalClick}
        />
        {this.props.text && (<span className='checkbox--text'>{this.props.text}</span>)}
      </label>
    );
  }
}

export default Checkbox;
