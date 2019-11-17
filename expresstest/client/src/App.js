import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClerkRent from './components/clerk/clerkrent';
import ClerkReturn from './components/clerk/clerkreturn';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>Clerk</h2>
        <ClerkRent/>
        <ClerkReturn/>
      </header>
    </div>
  );
}

export default App;
