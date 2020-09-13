import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import login from './components/login/login'
import PageNotFound from './components/pages/PageNotFound';
import Register from './components/login/register';
import dashboard from './components/content/dashboard';
import AddContent from './components/content/AddContent';
import EditContent from './components/content/EditContent';
import { ProtectedRoute } from "./protected.route";
import Notifier from './components/content/Notifier';


function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Notifier></Notifier>
        <Switch>
          <Route exact path="/" component={login}/>
          <Route exact path="/login" component={login}/>
          <ProtectedRoute exact path="/dashboard" component={dashboard}/>
          <Route exact path="/register" component={Register}/>
          <ProtectedRoute exact path ="/content/add" component={AddContent}/>
          <ProtectedRoute exact path ="/content/edit/:id" component={EditContent}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
