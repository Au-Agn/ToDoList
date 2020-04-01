import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';

import { Button, Checkbox, Input } from '../../../Primitives';
import { Categories } from '../index';
import { categoriesModes } from '../Categories';
import { editTask } from '../../../../state/Tasks/actions';
import { fetchRenameCategory, putNewCategory, deleteCategory } from '../../../../State/Category/utils';
import './Category.scss';

export const categoryModes = {
  default: 'default',
  rename: 'rename',
  reassign: 'reassign'
};

class Category extends Component {
  static propTypes = {
    category: PropTypes.object,
    handleDeletCategory: PropTypes.func,
    onClickAdd: PropTypes.func,
    id: PropTypes.string,
    match: PropTypes.object,
    history: PropTypes.object,
    mode: PropTypes.string,
    handleRenameCategory: PropTypes.func,
    handleEditTodo: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { category } = this.props;
    this.state = {
      checked: false,
      mode: this.props.mode,
      title: category.content
    };
  }

  handleClick = () => this.setState({ checked: !this.state.checked });

  handleTest = () => {
    // eslint-disable-next-line react/prop-types
    this.props.onClicked(this.props.category.id);
  }

  // delet category
  handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { handleDeletCategory } = this.props;
    handleDeletCategory && handleDeletCategory({
      id: this.props.category.id,
      content: this.state.title
    });
  }

  handleAddSubCategory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onClickAdd } = this.props;
    onClickAdd({
      parentId: this.props.category.id,
      content: this.props.category.content + '_subcategory'
    });
  }

  handleRenameEdit = () => {
    this.setState({
      mode: categoryModes.rename
    });
  }

  handleSaveEdit = () => {
    const { handleRenameCategory } = this.props;
    handleRenameCategory({
      id: this.props.category.id,
      content: this.state.title
    });
    this.setState({
      mode: this.props.mode
    });
  }

  handleChangeCategory = (title) => {
    this.setState({ title });
  }

  handleAddEditTask = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { handleEditTodo, history } = this.props;
    const editId = history.location.pathname.split('/');
    handleEditTodo({
      categoryId: this.props.category.id,
      id: editId[editId.length - 1]
    });
  }

  renderDefaultMode = () => {
    const { category } = this.props;
    const arrowNameClass = this.state.checked ? 'down' : 'up';
    const showSubCategory = this.state.checked ? 'subCategory' : 'hideCategory';
    return (
      <>
        <div
          className='category'
          onClick={this.handleTest}
        >
          <div>
            <Checkbox className={`${arrowNameClass}`} onClick={this.handleClick} checked={this.state.checked} text={category.content} />
            <Button onClick={this.handleRenameEdit} className='category--button'><FontAwesomeIcon icon={faEdit} /></Button>
          </div>
          <div>
            <Button onClick={this.handleDelete} className='category--button'><FontAwesomeIcon icon={faTrash} /></Button>
            <Button onClick={this.handleAddSubCategory} className='category--button'><FontAwesomeIcon icon={faPlus} /></Button>
          </div>
        </div>
        <Categories
          categories={this.state.categories}
          parentId={category.id}
          match={this.props.match}
          history={this.props.history}
          className={`${showSubCategory}`}
          mode={categoriesModes.sub}
        />
      </>
    );
  }

  renderRenameMode = () => {
    return (
      <div
        className='category'
      >
        <div>
          <Input onChange={(e) => this.handleChangeCategory(e.target.value)} value={this.state.title} />
        </div>
        <div>
          <Button onClick={this.handleSaveEdit} className='category--button'><FontAwesomeIcon icon={faEdit} /></Button>
        </div>
      </div>
    );
  }

  renderReassignMode = () => {
    const { category } = this.props;
    return (
      <>
        <div
          className='category'
          onClick={this.handleTest}
        >
          <div>
            <Checkbox className='checkbox--edit' onClick={this.handleClick} checked={this.state.checked} text={category.content} />
          </div>
          <div>
            <Button onClick={this.handleAddEditTask} className='category--button'><FontAwesomeIcon icon={faCaretSquareLeft} /></Button>
          </div>
        </div>
        <Categories
          categories={this.state.categories}
          parentId={category.id}
          match={this.props.match}
          history={this.props.history}
          className='subCategory'
          mode={categoriesModes.sub}
          isEditPage
        />
      </>
    );
  }

  renderesMap = {
    [categoryModes.default]: () => this.renderDefaultMode(),
    [categoryModes.rename]: () => this.renderRenameMode(),
    [categoryModes.reassign]: () => this.renderReassignMode()
  }

  render() {
    return this.renderesMap[this.state.mode || categoryModes.default]();
  }
};

const mapDispatchToProps = dispatch => ({
  handleEditTodo: item => dispatch(editTask(item)),
  handleRenameCategory: item => dispatch(fetchRenameCategory(item)),
  handleDeletCategory: id => dispatch(deleteCategory(id)),
  onClickAdd: category => dispatch(putNewCategory(category))
});

export default connect(null, mapDispatchToProps)(Category);
