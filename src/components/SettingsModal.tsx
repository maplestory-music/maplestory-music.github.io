/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext';

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

  const onModalSave = () => {
    setSettings({ hideMinorTracks });
    onModalClose();
  };

  const onModalShow = () => {
    setHideMinorTracks(settings.hideMinorTracks);
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
                align-items: center;
              `}
            >
              <Form.Check
                type="switch"
                id="minorTrack-switch"
                label="Hide Minor Tracks"
                checked={hideMinorTracks}
                onChange={() => {
                  setHideMinorTracks((prev) => !prev);
                }}
              />
              <OverlayTrigger
                delay={{ show: 250, hide: 100 }}
                placement="right"
                overlay={
                  <Tooltip id={`tooltip-minorTrack`}>
                    Minor tracks feature segments of another song
                  </Tooltip>
                }
              >
                <i
                  css={css`
                    margin: 0 4px;
                  `}
                  className="fa fa-question-circle"
                  aria-hidden={true}
                ></i>
              </OverlayTrigger>
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
