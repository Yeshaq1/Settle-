import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import '../src/assets/js/custom';
import EditMyAccountPage from './Pages-Component/EditMyAccountPage';
import GuestPayComponent from './Pages-Component/GuestPayComponent';
import HomeComponent from './Pages-Component/HomeComponent';
import OrderHistoryPage from './Pages-Component/OrderHistoryPage';

import QRComponent from './Pages-Component/Qr-Component';
import ThankuPage from './Pages-Component/ThankuPage';
import PaymentMethods from './Share-Component/PaymentMethods';
import ReceiptComponent from './Share-Component/ReceiptComponent';
import { toast, ToastContainer } from "react-toastify"



function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact><QRComponent /></Route>
          <Route path="/home" exact><HomeComponent /></Route>
          <Route path="/guest-pay" exact><GuestPayComponent /></Route>
          <Route path="/thanks" exact><ThankuPage /></Route>
          <Route path="/payment-methods" exact><PaymentMethods /></Route>
          <Route path="/order-history" exact><OrderHistoryPage /></Route>
          <Route path="/receipt" exact><ReceiptComponent /></Route>
          <Route path="/edit-account" exact><EditMyAccountPage /></Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
