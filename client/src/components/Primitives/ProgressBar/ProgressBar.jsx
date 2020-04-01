import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ProgressBar.scss';

class ProgressBar extends Component {
  static propTypes = {
    arrayTasksLength: PropTypes.number,
    arrayCheckedTasksLength: PropTypes.number,
    category: PropTypes.array,
    tasks: PropTypes.number,
    checkTasks: PropTypes.number
  };

  handleCheckBar = () => {
    const { arrayTasksLength, arrayCheckedTasksLength, category, tasks, checkTasks } = this.props;
    if (category) {
      return (arrayTasksLength)
        ? ((arrayCheckedTasksLength / arrayTasksLength) * 100).toFixed(1) : 0;
    } else {
      return (tasks)
        ? ((checkTasks / tasks) * 100).toFixed(1) : 0;
    }
  }

  render() {
    const entryTasks = this.handleCheckBar();
    return (
      <div className='progress-bar'>
        <div style={{ width: `${entryTasks}%` }} className='bar' />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.length,
    checkTasks: state.tasks.filter(task => task.checked === true).length,
    category: state.categories,
    arrayTasksLength: state.tasks
      .filter(task => task.categoryId === props.match.params.id).length,
    arrayCheckedTasksLength: state.tasks
      .filter(task => task.categoryId === props.match.params.id)
      .filter(task => task.checked === true).length
  };
};

export default connect(mapStateToProps, null)(ProgressBar);
