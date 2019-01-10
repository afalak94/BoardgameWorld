import React from 'react';
import ReactDOM from 'react-dom';
import './main/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home, FAQ, GameInfo, Notfound } from './main/views';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './main/Redux/store';
import { Listing } from './modules/Listing';
import { Login, ResetPassword, Register } from './modules/Authentication';
import { Cart } from './modules/Cart';
import { AdminSection } from './modules/Admin';
import { Header, Footer } from './modules/Navigation';

const routing = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <div className='background'>
          <div className='container-fluid'>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/listing' component={Listing} />
              <Route path='/faq' component={FAQ} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/password' component={ResetPassword} />
              <Route path='/cart' component={Cart} />
              <Route path='/game/:id' component={GameInfo} />
              <Route path='/admin' component={AdminSection} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
