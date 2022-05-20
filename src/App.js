import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator } from '@aws-amplify/ui-react';

function App({ signOut, user }) {
  console.log(user)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1> Hello, {user.username} </h1>
        <button onClick={signOut}> Sign Out </button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
