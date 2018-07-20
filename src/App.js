import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import fb from './services/FirebaseService';
import SignedIn from './SignedIn/SignedIn';
import './App.css';

const Aux = ({children}) => children;

const firebase = fb.self;

class SignInScreen extends Component {

  // 0: don't know yet
  // 1: is signed in
  // 2: is not signed in
  state = {
    signedIn: 0,
    userData: null
  }

  constructor() {
    super();

    // Configure FirebaseUI.
    this.uiConfig = {
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ]
    };
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      user => {
        console.log(user);
        if(user) {
          this.setState({
            userData: user,
            signedIn: 1
          });
        } else {
          this.setState({
            signedIn: 2
          });
        }
      }
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    // set the output based on signed in state
    let markup;
    switch(this.state.signedIn) {
      case 0:
        markup = null;
        break;
      case 1:
        markup = (
          <SignedIn user={this.state.userData} />
        );
        break;
      case 2:
        markup = (
          <Aux>
            <p>Please sign-in</p>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </Aux>
        );
        break;
      default:
        markup = null;
    }

    return (
      <div className="App">
        <h1>Budget Simple</h1>
        { markup }
      </div>
    );
  }
}

export default SignInScreen;
