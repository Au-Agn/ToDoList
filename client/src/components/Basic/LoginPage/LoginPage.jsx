import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from '../../Primitives';
import { userLoginPost } from '../../../state/User/fetch';
import './LoginPage.scss';

class LoginPage extends Component {
  static propTypes = {
    history: PropTypes.object,
    userLogin: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };
  }

  handleChangeLogin = login => {
    this.setState({ login });
  };

  handleChangePassword = password => {
    this.setState({ password });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { userLogin } = this.props;
    userLogin(this.state)
    .then(() => {
        const { history } = this.props;
        history.push('/category');
      });
  };

  render() {
    return (
      <div className='form'>
        <form onSubmit={this.handleSubmit} className='login-form'>
          <Input
            className='login-form--input'
            onChange={e => this.handleChangeLogin(e.target.value)}
            value={this.state.login}
            placeholder='login'
          />
          <Input
            className='login-form--input'
            onChange={e => this.handleChangePassword(e.target.value)}
            value={this.state.password}
            type='password'
            placeholder='password'
          />
          <Button
            type='submit'
            className='login-form--btn'
          >
            login
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLogin: userInfo => dispatch(userLoginPost(userInfo))
});

export default connect(null, mapDispatchToProps)(LoginPage);
