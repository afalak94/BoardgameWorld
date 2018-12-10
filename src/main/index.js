import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Listing from '../modules/Listing/index';
import FAQ from '../modules/FAQ/index';
import Login from '../modules/Login/index';
import Cart from '../modules/Cart/index';
import Register from '../modules/Register/index';
import GameInfo from '../modules/GameInfo/index';
import Notfound from '../modules/404/notFound';
import AdminSection from '../modules/Admin/index';
import Navigation from './Header/Navigation';

const routing = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navigation />
        <div className='background'>
          <div className='container-fluid'>
            <Switch>
              <Route path='/' component={App} exact />
              <Route path='/listing' component={Listing} />
              <Route path='/faq' component={FAQ} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/cart' component={Cart} />
              <Route path='/game/:id' component={GameInfo} />
              <Route path='/admin' component={AdminSection} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
