import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTasks, addNewTask } from '../../../state/Tasks/fetchs';
import { Task } from './Task';
import { AddForm } from '../AddForm';
import { editTask } from '../../../state/Tasks/actions';
import { getfilteredTodo } from '../../../state/Tasks/selectors';
import './Tasks.scss';

const token = localStorage.getItem('user');

class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.array,
    handleAddTask: PropTypes.func,
    handleCheckTask: PropTypes.func,
    history: PropTypes.object,
    fetchTasksFromApi: PropTypes.func
  };

  componentDidMount() {
    const { fetchTasksFromApi } = this.props;
    fetchTasksFromApi(token);
  }

  renderDefaultTasks = () => {
    const { tasks } = this.props;
    return tasks && tasks.length
      ? tasks.map((task) => (
        <Task
          onCheckboxClick={this.props.handleCheckTask}
          key={task.id}
          task={task}
          history={this.props.history}
        />
      ))
      : (
        <p>
          You not have task
        </p>
      );
  }

  render() {
    const { handleAddTask } = this.props;
    return (
      <>
        <AddForm name='newTask' onSubmitForm={handleAddTask} className='taskAddForm' />
        {this.renderDefaultTasks()}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    tasks: getfilteredTodo(state.tasks, ownProps)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAddTask: task => dispatch(addNewTask({ content: task.content, categoryId: ownProps.categoryId, checked: false, description: '' })),
  handleCheckTask: (id, checked) => dispatch(editTask({ id, checked })),
  fetchTasksFromApi: task => dispatch(fetchTasks(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
