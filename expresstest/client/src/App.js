import React from 'react';
import './App.css';
import ClerkRent from './components/clerk/clerkrent';
import ClerkReturn from './components/clerk/clerkreturn';
import CustomerReservation from './components/customer/customerreservation';
import DbViewAllTables from './components/dbOperations/dbViewAll';
import DbViewOneTable from './components/dbOperations/dbViewOne';
import DbUpdate from './components/dbOperations/dbUpdate';
import DbAdd from './components/dbOperations/dbAdd';
import DbDelete from './components/dbOperations/dbDelete';
import RentalReport from './components/reports/rentalReport';
import RentalBranchReport from './components/reports/rentalBranchReport';
import ReturnReport from './components/reports/returnReport';
import ReturnBranchReport from './components/reports/returnBranchReport';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Customer</h2>
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
          </div>
          <div className = "flex">
            <div className="flex-element">
              <ClerkReturn/>
            </div>
          </div>
          <div >
            <h2>Daily Reports</h2>
            <div>
              <RentalReport/>
            </div>
            <div>
              <RentalBranchReport/>
            </div>
            <div>
              <ReturnReport/>
            </div>
            <div>
              <ReturnBranchReport/>
            </div>
          </div>
          <div>
            <h2>DB Operations</h2>
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
