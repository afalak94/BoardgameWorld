import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './main/css/index.css';
import { Home, FAQ, GameInfo, Notfound } from './main';
import store from './main/Redux/store';
import { Listing } from './modules/Boardgames';
import { Login, ResetPassword, Register } from './modules/Authentication';
import { Cart } from './modules/Cart';
import { AdminSection } from './modules/Admin';
import ScrollToTop, {
  Header,
  Footer,
  ProtectedRoute
} from './modules/Navigation';

const routing = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <ScrollToTop>
          <div className='background'>
            <div className='container-fluid'>
              <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/listing' component={Listing} exact />
                <Route path='/faq' component={FAQ} exact />
                <Route path='/login' component={Login} exact />
                <Route path='/register' component={Register} exact />
                <Route path='/password' component={ResetPassword} exact />
                <Route path='/cart' component={Cart} exact />
                <Route path='/game/:id' component={GameInfo} exact />
                <ProtectedRoute path='/admin' component={AdminSection} />

                <Route component={Notfound} />
              </Switch>
            </div>
          </div>
        </ScrollToTop>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
