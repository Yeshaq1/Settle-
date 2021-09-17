

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthModule from './MODULE/AuthModule';
import DashboardModule from './MODULE/DashboardModule';
import QRGenaretor from './PAGES/QRGenaretor';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={AuthModule} /> */}
          <Route exact path="/"><AuthModule /></Route>
          <Route exact path="/reset-password"><AuthModule /></Route>
          <Route exact path="/email-confirmation"><AuthModule /></Route>
          
          <Route exact path="/dashboard" component={DashboardModule} />
          <Route exact path="/dashboard/payment-status" component={DashboardModule} />
          <Route exact path="/dashboard/menu" component={DashboardModule} />
          <Route exact path="/dashboard/order-history" component={DashboardModule} />
          <Route exact path="/dashboard/feedback" component={DashboardModule} />
          <Route exact path="/dashboard/account" component={DashboardModule} />
          <Route exact path="/dashboard/help" component={DashboardModule} />
          <Route exact path="/dashboard/qr-genarator" component={DashboardModule} />
        </Switch>
      </Router>
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      limit={5} 
      draggable
      />  
    </>
  );
}

export default App;
