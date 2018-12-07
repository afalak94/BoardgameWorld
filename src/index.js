import React from 'react';
import ReactDOM from 'react-dom';
import './main/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './main/App';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Listing from './modules/Listing/index';
import FAQ from './modules/FAQ/index';
import Login from './modules/Login/index';
import Cart from './modules/Cart/index';
import Register from './modules/Register/index';
import GameInfo from './modules/GameInfo/index';
import Notfound from './modules/404/notFound';
import Navigation from './main/Header/Navigation';

const routing = (
  <BrowserRouter>
    <div>
      <Navigation />
      <div className='container-fluid'>
        <Switch>
          <Route path='/' component={App} exact />
          <Route path='/listing' component={Listing} />
          <Route path='/faq' component={FAQ} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/cart' component={Cart} />
          <Route path='/game/:id' component={GameInfo} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
