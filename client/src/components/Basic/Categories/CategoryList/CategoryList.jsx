import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../../../../state/Category/utils';
import { Categories } from '../index';
const token = localStorage.getItem('user');

class CategoryList extends Component {
  static propTypes = {
    mode: PropTypes.string,
    history: PropTypes.object,
    match: PropTypes.object,
    categories: PropTypes.array,
    fetchCategoriesFromApi: PropTypes.func
  };

  componentDidMount() {
    const { fetchCategoriesFromApi } = this.props;
    fetchCategoriesFromApi(token);
  }

  render() {
    return (this.props.categories && this.props.categories.length > 0)
      ? <Categories
        categories={this.props.categories}
        match={this.props.match}
        history={this.props.history}
        mode={this.props.mode}
      />
      : <p>No categories</p>;
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCategoriesFromApi: url => dispatch(fetchCategories(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
