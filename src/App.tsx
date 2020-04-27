import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

const Header = () => (
  <Navbar bg='dark' variant='dark' expand='lg'>
    <Navbar.Brand as={Link} to='/'>
      MapleStory Music
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link as={NavLink} exact to='/'>
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/about'>
          About
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
    </Switch>
  </main>
);

const Home = () => (
  <div className='App'>
    <HomePage />
  </div>
);

const About = () => (
  <div className='About'>
    <AboutPage />
  </div>
);

const App = () => (
  <Router>
    <div>
      <Header />
      <Main />
    </div>
  </Router>
);

export default App;
