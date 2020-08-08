import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };
  
  UNSAFE_componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCX0Dpw1XOguo4BUCCmI86zncd4e6-9138",
        authDomain: "authentication-f0360.firebaseapp.com",
        databaseURL: "https://authentication-f0360.firebaseio.com",
        projectId: "authentication-f0360",
        storageBucket: "authentication-f0360.appspot.com",
        messagingSenderId: "1033374402289",
        appId: "1:1033374402289:web:3c1d6397bd5bdf23f54b50",
        measurementId: "G-REPX5GLJ2Z"
      });
   }

   firebase.auth().onAuthStateChanged((user) => {     
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
   });    
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true: 
        return (
          <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>             
          </CardSection>
         );
      case false: 
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;