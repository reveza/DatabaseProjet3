import React from 'react';
import './App.css';
import ClerkRent from './components/clerk/clerkrent';
import ClerkReturn from './components/clerk/clerkreturn';
import DailyReport from './components/reports/dailyReport';
import CustomerReservation from './components/customer/customerreservation';
import ViewAvailableVehicles from './components/customer/viewavailablevehicles';
import DbViewAllTables from './components/dbOperations/dbViewAll';
import DbViewOneTable from './components/dbOperations/dbViewOne';
import DbUpdate from './components/dbOperations/dbUpdate';
import DbAdd from './components/dbOperations/dbAdd';
import DbDelete from './components/dbOperations/dbDelete';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Customer</h2>
        <div className="flex">
          <div className="flex-element">
            <ViewAvailableVehicles/>
          </div>
        </div>
          <div className="flex">
            <div className="flex-element">
              <CustomerReservation/>
            </div>
          </div>
        <h2>Clerk</h2>
          <div className = "flex">
            <div className="flex-element">
              <ClerkRent/>
            </div>
            <div className="flex-element">
              <ClerkReturn/>
            </div>
          </div>
          <div className="flex">
            <div className="flex-element">
              <DailyReport/>
            </div>
          </div>
          <div>
            <h5>DB Operations</h5>
            <DbViewAllTables/>
            <DbViewOneTable/>
            <DbUpdate/>
            <DbAdd/>
            <DbDelete/>
          </div>
      </header>
    </div>
  );
}

export default App;
