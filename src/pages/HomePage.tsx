import React from 'react';
import MusicGrid from '../components/MusicGrid';

const HomePage: React.FC = () => (
  <div>
    <div>
      <img id='header-logo' src='assets/pink-bean.png' alt='header logo' />
    </div>
    <div>
      <p>
        Welcome to the MapleStory Music database. This site provides a complete
        listing of the background music (BGM) used in MapleStory. Collectively,
        the songs are also known as MapleStory's original soundtrack (OST). To
        sort by a column, press the column header. Hover over a column header
        and press the menu icon to access the advanced filter dialog. Mobile
        users can access the filter dialog by pressing and holding the column
        header.
      </p>
    </div>
    <MusicGrid />
  </div>
);

export default HomePage;
