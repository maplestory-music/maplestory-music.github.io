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
      <h4 className='gh-project-name'>
        maplebgm-db: Definitive MapleStory music database
      </h4>
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
      <h4 className='gh-project-name'>
        maplestory-music: MapleStory Music website
      </h4>
    </div>
  </div>
);

export default AboutPage;
