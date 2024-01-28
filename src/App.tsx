/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import './App.scss';
import {
  Router,
  Switch,
  Route,
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import { DataSourceProvider } from './context/DataSourceContext';
import React, { ReactElement, useEffect, useState } from 'react';
import { formatISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SettingsModal } from './components/SettingsModal';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeIcon } from './components/ThemeIcon';
import PlaylistPage from './pages/PlaylistPage';
import PlaylistBuilderPage from './pages/PlaylistBuilderPage';

const history = createBrowserHistory();

const onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void = (
  e
) => {
  const target = e.currentTarget;
  if (target.pathname === window.location.pathname) {
    e.preventDefault();
  }
};

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const appTheme = useTheme();
  const [settingsModalVisible, setSettingModalVisible] = useState(false);
  return (
    <>
      <Navbar
        css={css`
          margin-bottom: 10px;
        `}
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand
          css={css`
            margin-left: 1rem;
          `}
          as={Link}
          to="/"
          onClick={onNavLinkClick}
        >
          <img
            css={css`
              margin-right: 8px;
            `}
            alt=""
            src="./assets/pb-logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          MapleStory Music
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} exact to="/" onClick={onNavLinkClick}>
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              exact
              to="/playlist"
              onClick={onNavLinkClick}
            >
              Playlist
            </Nav.Link>
            <Nav.Link as={NavLink} exact to="/stats" onClick={onNavLinkClick}>
              Stats
            </Nav.Link>
            <Nav.Link as={NavLink} exact to="/about" onClick={onNavLinkClick}>
              About
            </Nav.Link>
            <NavDropdown title="Extras">
              <NavDropdown.Item
                as={NavLink}
                exact
                to="/playlist-builder"
                onClick={onNavLinkClick}
              >
                Playlist Builder
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                appTheme.darkMode ? (
                  <ThemeIcon theme="dark" />
                ) : (
                  <ThemeIcon theme="light" />
                )
              }
            >
              <NavDropdown.Item
                active={!appTheme.darkMode}
                onClick={() => {
                  if (!appTheme.darkMode) return;
                  darkmode.setDarkMode(false);
                  gtag('event', 'ce_ui_light', {
                    ce_category: 'ui',
                    ce_source: 'navbar',
                  });
                }}
              >
                <ThemeIcon theme="light" margin />
                Light
              </NavDropdown.Item>
              <NavDropdown.Item
                active={appTheme.darkMode}
                onClick={() => {
                  if (appTheme.darkMode) return;
                  darkmode.setDarkMode(true);
                  gtag('event', 'ce_ui_dark', {
                    ce_category: 'ui',
                    ce_source: 'navbar',
                  });
                }}
              >
                <ThemeIcon theme="dark" margin />
                Dark
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<i className="fa fa-earth-americas" />}>
              <NavDropdown.Item
                active={i18n.language?.startsWith('en')}
                onClick={() => i18n.changeLanguage('en')}
              >
                English
              </NavDropdown.Item>
              <NavDropdown.Item
                active={i18n.language?.startsWith('ko')}
                onClick={() => i18n.changeLanguage('ko')}
              >
                Korean
              </NavDropdown.Item>
              <NavDropdown.Item
                active={i18n.language?.startsWith('ja')}
                onClick={() => i18n.changeLanguage('ja')}
              >
                Japanese
              </NavDropdown.Item>
              <NavDropdown.Item
                active={i18n.language === 'zh-CN'}
                onClick={() => i18n.changeLanguage('zh-CN')}
              >
                Chinese (Simplified)
              </NavDropdown.Item>
              <NavDropdown.Item
                active={i18n.language === 'zh-TW'}
                onClick={() => i18n.changeLanguage('zh-TW')}
              >
                Chinese (Traditional)
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              as={NavLink}
              to="#"
              onClick={() => setSettingModalVisible(true)}
            >
              <i className="fa fa-cog"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <SettingsModal
        show={settingsModalVisible}
        onModalClose={() => setSettingModalVisible(false)}
      />
    </>
  );
};

const Footer = (): ReactElement => {
  const buildHash = process.env.REACT_APP_BUILD_HASH ?? 'Dev';
  const buildDate =
    process.env.REACT_APP_BUILD_DATE ??
    formatISO(new Date(), { representation: 'date' });
  return (
    <div
      css={css`
        text-align: center;
        margin-bottom: 10px;
      `}
      className="footer"
    >
      <span>{`Build: ${buildHash} (${buildDate})`}</span>
    </div>
  );
};

const siteTitle = 'MapleStory Music - BGM & OST Database';
const pageTitles: { [name: string]: string } = {
  '/': siteTitle,
  '/playlist': `${siteTitle} - Playlist`,
  '/stats': `${siteTitle} - Stats`,
  '/about': `${siteTitle} - About`,
  '/playlist-builder': `${siteTitle} - Playlist Builder`,
};

const Main = (): ReactElement => {
  const location = useLocation();
  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? siteTitle;
  }, [location]);
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/playlist" component={Playlist} />
        <Route path="/stats" component={Stats} />
        <Route path="/about" component={About} />
        <Route path="/playlist-builder" component={PlaylistBuilder} />
      </Switch>
    </main>
  );
};

const Home = (): ReactElement => (
  <div className="App">
    <HomePage />
  </div>
);

const Playlist = (): ReactElement => (
  <div className="App">
    <PlaylistPage />
  </div>
);

const About = (): ReactElement => (
  <div
    css={css`
      margin: 2% 3% 3% 3%;
    `}
    className="About"
  >
    <AboutPage />
  </div>
);

const Stats = (): ReactElement => (
  <div
    css={css`
      margin: 2% 3% 1% 3%;
    `}
    className="Stats"
  >
    <StatsPage />
  </div>
);

const PlaylistBuilder = (): ReactElement => (
  <div
    css={css`
      margin: 2% 3% 3% 3%;
    `}
    className="About"
  >
    <PlaylistBuilderPage />
  </div>
);

const App = (): ReactElement => (
  <ThemeProvider>
    <SettingsProvider>
      <DataSourceProvider>
        <Router history={history}>
          <div>
            <Header />
            <Main />
            <Footer />
          </div>
        </Router>
      </DataSourceProvider>
    </SettingsProvider>
  </ThemeProvider>
);

export default App;
