import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';
import store from 'store';
import { theme } from 'constants/themes.constants';

import TasksView from 'components/TasksView';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Route exact path="/" component={TasksView} />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
