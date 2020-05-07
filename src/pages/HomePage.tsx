import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import MusicGrid from '../components/MusicGrid';

const HomePage: React.FC = () => {
  const [filterText, setFilterText] = useState<string>();

  const onFilterTextChanged: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setFilterText(event.target.value);
  };

  // Handle mobile quick filter submission
  const onFilterTextKeyPress: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void = (event) => {
    if (event.key === 'Enter' && document.activeElement) {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }
  };

  return (
    <div>
      <div>
        <img id='header-logo' src='assets/pink-bean.png' alt='header logo' />
      </div>
      <div>
        <p>
          Welcome to the MapleStory Music database. This site provides a
          complete listing of the background music (BGM) used in MapleStory.
          Collectively, the songs are also known as MapleStory's original
          soundtrack (OST). To sort by a column, press the column header. Hover
          over a column header and press the menu icon to access the advanced
          filter dialog. Mobile users can access the filter dialog by pressing
          and holding the column header.
        </p>
      </div>
      <Form.Group className='filter-text'>
        <InputGroup size='lg'>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <i className='fa fa-search'></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type='text'
            placeholder='Song title or keyword'
            onChange={onFilterTextChanged}
            onKeyPress={onFilterTextKeyPress}
          />
        </InputGroup>
      </Form.Group>
      <MusicGrid query={filterText} />
    </div>
  );
};

export default HomePage;
