import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from '../../Primitives';

import './AddForm.scss';

class AddForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSubmitForm: PropTypes.func,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handleChange = content => {
    this.setState({ content });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmitForm } = this.props;
    onSubmitForm && onSubmitForm({ content: this.state.content });
    this.setState({
      content: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.className}>
        <Input name={this.props.name} onChange={(e) => this.handleChange(e.target.value)} value={this.state.content} />
        <Button type='submit' className='button--submit'>Add</Button>
      </form>
    );
  }
}

export default AddForm;
