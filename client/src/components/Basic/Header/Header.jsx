import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { replaseInQuery } from '../../../Helpers/UrlHelpers';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Checkbox, Input } from '../../Primitives';
import './Header.scss';

class Header extends Component {
  static propTypes = {
    history: PropTypes.object
  };

  constructor(props) {
    super(props);
    const { history } = this.props;
    const editInput = history.location.search.split('=');
    this.state = {
      inputValue: editInput[editInput.length - 1],
      checked: false
    };
  }

  handleClick = () => this.setState({ checked: !this.state.checked }, () => {
    const { history } = this.props;
    history.push({ search: replaseInQuery(history.location.search, { showDone: this.state.checked }) });
  });

  handleFilterValue = (e) => this.setState({ inputValue: e.target.value }, () => {
    const { history } = this.props;
    history.push({ search: replaseInQuery(history.location.search, { searchValue: this.state.inputValue }) });
  });

  handleDeleteValue = () => this.setState({ inputValue: '' }, () => {
    const { history } = this.props;
    history.push({ search: replaseInQuery(history.location.search, { searchValue: undefined }) });
  });

  render() {
    return (
      <div className='header'>
        <h1>To-Do List</h1>
        <div className='header--checkbox'>
          <Checkbox onClick={this.handleClick} checked={this.state.checked} text='Show done' />
          <div className='header--search'>
            <Input value={this.state.inputValue} onChange={this.handleFilterValue} />
            <FontAwesomeIcon onClick={this.handleDeleteValue} className='header--icon' icon={faTimes} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
