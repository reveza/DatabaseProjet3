import React from 'react';
import './App.css';
import ClerkRent from './components/clerk/clerkrent';
import ClerkReturn from './components/clerk/clerkreturn';
import DailyReport from './components/reports/dailyReport';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Clerk</h2>
        <div className="flex">
          <div className="flex-element">
             <ClerkRent/>
          </div>
          <div className="flex-element">
            <ClerkReturn/>
          </div>
        </div>
        <DailyReport/>
      </header>
    </div>
  );
}

export default App;
