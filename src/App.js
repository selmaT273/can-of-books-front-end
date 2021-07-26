import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Login from './Login';
import Profile from './Profile';
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    console.log('app', this.props);
    const { user, isAuthenticated } = this.props.auth0;
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <BestBooks /> : <Login />}
              </Route>
            </Switch>
            <Switch>
              <Route exact path="/profile">
                {isAuthenticated ? <Profile /> : 
                  <>
                  <p>Log in to see profile</p>
                  <Login />
                  </>}
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);