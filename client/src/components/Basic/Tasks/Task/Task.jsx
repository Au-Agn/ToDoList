import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Checkbox } from '../../../Primitives';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './Task.scss';

export default class Task extends Component {
  static propTypes = {
    task: PropTypes.object,
    onCheckboxClick: PropTypes.func,
    history: PropTypes.object
  };

  handleClick = (checked) => this.props.onCheckboxClick(this.props.task.id, checked);

  handleEditClick = () => {
    const { history, task } = this.props;
    history.push(`/tasks/${task.id}`);
  }

  render() {
    const { task } = this.props;
    return (
      <div className='task'>
        <div>
          <Checkbox onClick={this.handleClick} checked={task.checked} text={task.content} />
        </div>
        <Button onClick={this.handleEditClick} className='task--button'><FontAwesomeIcon icon={faEdit} /></Button>
      </div>
    );
  }
};
