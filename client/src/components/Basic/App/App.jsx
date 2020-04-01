import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Page } from '../Page';
import { PageEdit } from '../PageEdit';
import { LoginPage } from '../LoginPage';
import { initialState } from '../../../state/initialState';
import { ProtectedRoute } from './ProtectedRouter';
import configureStore from '../../../state/configureStore';

const store = configureStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path='/category/:id?' component={Page} />
            <ProtectedRoute path='/tasks/:id' component={PageEdit} />
            <Route exact path='/login' component={LoginPage} />
            <Route path='*' component={() => 'not found'} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
