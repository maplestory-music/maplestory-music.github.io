import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MusicTable from './MusicTable.jsx';
import './App.css';

const Header = () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/" className='navbar-brand'>Maple Music</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/about">
          <NavItem eventKey={1} href="#">About</NavItem>
        </LinkContainer>
        <LinkContainer to="/topics">
          <NavItem eventKey={2} href="#">Topic</NavItem>
        </LinkContainer>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
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
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;
