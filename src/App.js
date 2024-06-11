import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ClassicRoutes from './routes/Classic';
import AuthRoutes from './routes/AuthRoutes';
import "bootstrap/js/src/collapse";
import ScrollToTop from './utils/ScrollToTop';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from './configs/constants/ThemeConstants';

function App() {

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  return (
    <>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <BrowserRouter >
          <ScrollToTop>
            <Switch>
              <Redirect exact from="/" to="/auth/login" />
              {/* Auth */}
              <Route path="/auth" render={(props) => <AuthRoutes {...props} />} />
              {/* Layouts */}
              <Route path="/" render={(props) => <ClassicRoutes {...props} />} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </BrowserRouter>
    </Elements>
    </>
  );
}

export default App;
