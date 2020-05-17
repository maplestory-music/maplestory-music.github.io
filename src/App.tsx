/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import './App.css';
import { Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import { Navbar, Nav } from 'react-bootstrap';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

ReactGA.initialize('UA-53945508-5');
const history = createBrowserHistory();
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
});
ReactGA.pageview(window.location.pathname + window.location.search);

const onNavLinkClick: (e: React.MouseEvent) => void = (e) => {
  const target = e.currentTarget as HTMLAnchorElement;
  if (target.pathname === window.location.pathname) {
    e.preventDefault();
  }
};

const Header = () => (
  <Navbar
    css={css`
      margin-bottom: 10px;
    `}
    bg='dark'
    variant='dark'
    expand='lg'
  >
    <Navbar.Brand as={Link} to='/' onClick={onNavLinkClick}>
      <img
        css={css`
          margin-right: 8px;
        `}
        alt=''
        src='./assets/pb-logo.svg'
        width='30'
        height='30'
        className='d-inline-block align-top'
      />{' '}
      MapleStory Music
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link as={NavLink} exact to='/' onClick={onNavLinkClick}>
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} exact to='/about' onClick={onNavLinkClick}>
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
  <div
    css={css`
      margin: 2% 3% 3% 3%;
    `}
    className='About'
  >
    <AboutPage />
  </div>
);

const App = () => (
  <Router history={history}>
    <div>
      <Header />
      <Main />
    </div>
  </Router>
);

export default App;
