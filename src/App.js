import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AboutPage from './AboutPage.jsx';
import MusicTable from './MusicTable.jsx';
import './App.css';

const Header = () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/" className='navbar-brand'>MapleStory Music</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/about">
          <NavItem eventKey={1} href="#">About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
)

const Home = () => (
  <home>
    <div className="App">
      <MusicTable />
    </div>
  </home>
)

const About = () => (
  <div className="About">
    <AboutPage />
  </div>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;
