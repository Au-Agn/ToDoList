import React, { Component } from 'react';
import { CategoryList } from '../Categories/CategoryList';
import { Header } from '../Header';
import { ProgressBar } from '../../Primitives/ProgressBar';
import PropTypes from 'prop-types';
import './Page.scss';

class Page extends Component {
  static propTypes = {
    mode: PropTypes.string,
    history: PropTypes.object,
    match: PropTypes.object
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <div className='page'>
        <button onClick={this.handleClick}>
          logout
        </button>
        <Header
          match={this.props.match}
          history={this.props.history}
        />
        <ProgressBar
          match={this.props.match}
          history={this.props.history}
        />
        <main className='page--inner'>
          <CategoryList
            match={this.props.match}
            history={this.props.history}
            mode={this.props.mode}
          />
        </main>
      </div>
    );
  }
}

export default Page;
