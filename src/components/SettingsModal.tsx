/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext';
import { SettingsModalToggle } from './SettingsModalToggle';

interface ISettingsModalProps {
  show: boolean;
  onModalClose: () => void;
}

export const SettingsModal: React.FC<ISettingsModalProps> = ({
  show,
  onModalClose,
}) => {
  const { settings, setSettings } = useSettings();
  const [hideMinorTracks, setHideMinorTracks] = useState(
    settings.hideMinorTracks
  );
  const [distinctKmstVersion, setDistinctKmstVersion] = useState(
    settings.distinctKmstVersion
  );
  const [jsonOptimizedTrackIdCopy, setJsonOptimizedTrackIdCopy] = useState(
    settings.jsonOptimizedTrackIdCopy
  );
  const [savePlaylistState, setSavePlaylistState] = useState(
    settings.savePlaylistState
  );

  const onModalSave = () => {
    setSettings({
      hideMinorTracks,
      distinctKmstVersion,
      jsonOptimizedTrackIdCopy,
      savePlaylistState,
    });
    onModalClose();
  };

  const onModalShow = () => {
    setHideMinorTracks(settings.hideMinorTracks);
    setDistinctKmstVersion(settings.distinctKmstVersion);
    setJsonOptimizedTrackIdCopy(settings.jsonOptimizedTrackIdCopy);
    setSavePlaylistState(settings.savePlaylistState);
  };

  return (
    <Modal show={show} onShow={onModalShow} onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <>
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <SettingsModalToggle
                id="minorTrack"
                label="Hide Minor Tracks"
                checked={hideMinorTracks}
                tooltip="Minor tracks feature segments of another song"
                onChange={() => {
                  setHideMinorTracks((prev) => !prev);
                }}
              />
              <SettingsModalToggle
                id="distinctKmstVersion"
                label="Distinct KMST Version"
                checked={distinctKmstVersion}
                tooltip="Prevent collisions resulting from KMST version reset"
                onChange={() => {
                  setDistinctKmstVersion((prev) => !prev);
                }}
              />
              <SettingsModalToggle
                id="jsonOptimizedTrackIdCopy"
                label="JSON Optimized Track ID Copy"
                checked={jsonOptimizedTrackIdCopy}
                tooltip="Wrap track ID in JSON compatible syntax"
                onChange={() => {
                  setJsonOptimizedTrackIdCopy((prev) => !prev);
                }}
              />
              <SettingsModalToggle
                id="savePlaylistState"
                label="Save Current Playlist"
                checked={savePlaylistState}
                tooltip="Saves your current playlist in the browser's storage. Newly released tracks will not be added automatically."
                onChange={() => {
                  setSavePlaylistState((prev) => !prev);
                }}
              />
            </div>
          </>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onModalSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
