import React from 'react';
import Login from './components/Login';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Notifications from './components/Notifications'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
const App = () => {


  return (
    
    <BrowserRouter>
      
      <Navbar />
      <div className="container">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/notifications" exact component={Notifications} />
      </Switch>
      </div>
      
    </BrowserRouter>
    
  );
};

export default App;