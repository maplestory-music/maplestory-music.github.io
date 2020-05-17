import React from 'react';
import GitHubButton from 'react-github-btn';

const AboutPage: React.FC = () => (
  <div>
    <h2>About</h2>
    <p>
      This database catalogs music from every region of MapleStory and aims to
      be the definitive resource for MapleStory music. It will be updated
      whenever new songs are added to the client of any region.
    </p>
    <h6>Grid Controls</h6>
    <p>
      To sort by a column, press the column header. Hover over a column header
      and press the menu icon to access the advanced filter dialog. Mobile users
      can access the filter dialog by pressing and holding the column header.
    </p>
    <h2>Source</h2>
    <p>The following GitHub projects power this site.</p>
    <div className='gh-project-entry'>
      <GitHubButton
        href='https://github.com/maplestory-music/maplebgm-db'
        data-size='large'
        data-show-count={true}
        aria-label='Star maplestory-music/maplebgm-db on GitHub'
      >
        Star
      </GitHubButton>
      <h5 className='gh-project-name'>
        maplebgm-db: Definitive MapleStory music database
      </h5>
    </div>
    <div className='gh-project-entry'>
      <GitHubButton
        href='https://github.com/maplestory-music/maplestory-music.github.io'
        data-size='large'
        data-show-count={true}
        aria-label='Star maplestory-music/maplestory-music.github.io on GitHub'
      >
        Star
      </GitHubButton>
      <h5 className='gh-project-name'>
        maplestory-music: MapleStory Music website
      </h5>
    </div>
  </div>
);

export default AboutPage;
