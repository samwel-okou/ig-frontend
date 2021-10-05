import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Nav from './components/Nav';
import Create from './pages/Create';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SinglePost from './pages/SinglePost';

import './App.css';

function App() {
  return (
    <div className="App">
      <h2>App</h2>

      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={Create} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/:id" exact component={SinglePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
