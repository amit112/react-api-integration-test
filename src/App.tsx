import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import Users from './components/Users/Users';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="main">
<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Brand href="#home">Front End Task By Amit Using Reactjs</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
      <Nav.Link href="/">Users</Nav.Link>
      <Nav.Link  href="/articles">
       Articles
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

      <nav>
        <Switch>
    <Route  path ="/articles" component={Articles} />
    <Route  path ="/users" component={Users} />
    <Route  path ="/" component={Users} />
    </Switch>
    </nav>
    </div>
  );
}

export default App;
