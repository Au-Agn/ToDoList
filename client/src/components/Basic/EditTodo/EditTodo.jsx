import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Checkbox, Input } from '../../Primitives';
import './EditTodo.scss';
import { editTask } from '../../../state/Tasks/fetchs';

class EditTodo extends Component {
  static propTypes = {
    content: PropTypes.string,
    id: PropTypes.string,
    handleEditTodo: PropTypes.func,
    todoItem: PropTypes.object,
    checked: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const newLocal = this.props.todoItem;
    const { content, description, checked, categoryId } = newLocal;
    this.state = {
      description,
      title: content,
      checked,
      categoryId
    };
  }

  handleChangeTodo = (title) => {
    this.setState({ title });
  }

  handleChangeDescription = (description) => {
    this.setState({ description });
  }

  handleChangeCheck = (checked) => {
    this.setState({ checked });
  }

  handleSaveEdit = () => {
    const { handleEditTodo } = this.props;
    handleEditTodo({
      content: this.state.title,
      id: this.props.id,
      checked: this.state.checked,
      categoryId: this.state.categoryId,
      description: this.state.description
    });
  }

  handleClick = () => this.setState({ checked: !this.state.checked });

  render() {
    return (
      <>
        <div className='edit'>
          <Link to={`/category/${this.state.categoryId}`}>
            <Button onClick={this.handleSaveEdit} className='edit--Btn'>Save changes</Button>
          </Link>
          <Link to={`/category/${this.state.categoryId}`}>
            <Button className='edit--Btn'>Cancel</Button>
          </Link>
        </div>
        <Input onChange={(e) => this.handleChangeTodo(e.target.value)} value={this.state.title} className='edit--Input' />
        <Checkbox onChange={(e) => this.handleChangeCheck(e.target.value)} onClick={this.handleClick} checked={this.state.checked} text='Done' />
        <textarea onChange={(e) => this.handleChangeDescription(e.target.value)} value={this.state.description} placeholder='Discription' cols='72' rows='15' />
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  id: props.match.params.id,
  checked: props.match.params.checked,
  todoItem: state.tasks.find(task => task.id.toString() === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  handleEditTodo: item => dispatch(editTask(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
