import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Category } from './Category';
import { AddForm } from '../AddForm';
import { Tasks } from '../Tasks';
import { EditTodo } from '../EditTodo';
import { categoryModes } from './Category/Category.jsx';
import { putNewCategory } from '../../../State/Category/utils';
import './Categories.scss';

export const categoriesModes = {
  default: 'default',
  sub: 'sub-category',
  edit: 'edit'
};

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array,
    putNewCategory: PropTypes.func,
    id: PropTypes.string,
    mode: PropTypes.string,
    history: PropTypes.object,
    className: PropTypes.string,
    match: PropTypes.object,
    isEditPage: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      mode: this.props.mode
    };
  }

  renderesMap = {
    [categoriesModes.default]: () => this.renderDafaultMode(),
    [categoriesModes.sub]: () => this.renderSubMode(),
    [categoriesModes.edit]: () => this.renderEditMode()
  }

  // #region render
  renderCategories = () => {
    const { categories } = this.props;
    return categories && categories.length
      ? categories.map((category) => (
        <div key={category.id}>
          <Category
            onClicked={this.handleCategoryClick}
            onClickDelete={this.handleDelete}
            category={category}
            match={this.props.match}
            history={this.props.history}
            mode={this.props.isEditPage ? categoryModes.reassign : categoryModes.default}
          />
        </div>
      ))
      : (this.props.mode !== categoriesModes.sub) && (
        <p>
          You have no categories
        </p>
      );
  }

  renderTasks = () => {
    const { id, mode } = this.props;
    if (mode !== 'subCategory') {
      return <Tasks categoryId={id} history={this.props.history} search={this.props.history.location.search} />;
    }
    return null;
  }

  renderEditTasks = () => {
    return <EditTodo match={this.props.match} />;
  }

  handleSubmitCategory = (category) => {
    const { putNewCategory } = this.props;
    putNewCategory(category);
  }

  // #endregion

  // #region modes renderers

  renderDafaultMode = () => {
    return (
      <>
        <div className={`list--category ${this.props.className || ''}`}>
          <AddForm name='newCategory' onSubmitForm={this.handleSubmitCategory} className='categoryAddForm' />
          <div className='list--scroll'>
            {this.renderCategories()}
          </div>
        </div>
        <div className='list--toDo'>
          <div className='list--scroll'>
            {this.renderTasks()}
          </div>
        </div>
      </>
    );
  }

  renderEditMode = () => {
    return (
      <>
        <div className={`list--category ${this.props.className || ''}`}>
          <div className='list--scroll'>
            {this.renderCategories()}
          </div>
        </div>
        <div className='list--toDo'>
          {this.renderEditTasks()}
        </div>
      </>
    );
  }

  renderSubMode = () => {
    return (
      <div className={`list--category ${this.props.className || ''}`}>
        <div className='list--scroll'>
          {this.renderCategories()}
        </div>
      </div>
    );
  }

  // #endregion

  // #region handle
  handleDelete = ({ id }) => {
    const { handleDeletCategory } = this.props;
    this.setState({
      redirect: true
    });
    handleDeletCategory({ id });
  }

  handleCategoryClick = (id) => {
    const { history } = this.props;
    history.push(`/category/${id}${history.location.search}`);
  }
  // #endregion

  render() {
    return this.renderesMap[this.props.mode || categoriesModes.default]();
  }
}

const mapStateToProps = (state, props) => {
  return {
    id: props.match.params.id
  };
};

const mapDispatchToProps = dispatch => ({
  // handleDeletCategory: id => dispatch(deleteCategory(id)),
  putNewCategory: category => dispatch(putNewCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
