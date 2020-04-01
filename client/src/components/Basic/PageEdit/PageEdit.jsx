import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CategoryList } from '../Categories/CategoryList';
import './PageEdit.scss';
import { categoriesModes } from '../Categories/Categories';

class PageEdit extends Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    content: PropTypes.string,
    todoItem: PropTypes.object
  };

  constructor(props) {
    super(props);
    const { content } = this.props.todoItem;
    this.state = {
      title: content
    };
  }

  render() {
    return (
      <div className='pageEdit'>
        <div>
          <h1>{this.state.title}</h1>
        </div>
        <main className='pageEdit--inner'>
          <CategoryList
            match={this.props.match}
            history={this.props.history}
            mode={categoriesModes.edit}
            isEditPage
          />
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    todoItem: state.tasks.find(task => task.id.toString() === props.match.params.id)
  };
};

export default connect(mapStateToProps)(PageEdit);
