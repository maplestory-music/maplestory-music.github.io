/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import {
  getCustomPlaylists,
  playlistSanityCheck,
  resetCustomPlaylists,
  setCustomPlaylists,
} from '../components/utils/PlaylistUtils';

const reader = new FileReader();

const PlaylistBuilderPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [fileError, setFileError] = useState('');

  const onFileInputClick = () => {
    setFileError('');
  };

  const onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || !evt.target.files.length) return;
    setSelectedFile(evt.target.files[0]);
  };

  const onFileImport = () => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/json') {
      setFileError('File type not JSON');
      return;
    }
    reader.readAsText(selectedFile);
  };

  const onFileExport = () => {
    let outputFile: string | null = null;
    const playlists = getCustomPlaylists();
    const data = JSON.stringify(playlists, null, 2);
    if (!data || !playlists.length) {
      window.alert('Nothing to export');
      return;
    }
    const exportCustomPlaylists = () => {
      const blob = new Blob([data], {
        type: 'application/json',
      });
      if (outputFile !== null) {
        window.URL.revokeObjectURL(outputFile);
      }
      outputFile = window.URL.createObjectURL(blob);
      return outputFile;
    };
    const link = document.createElement('a');
    link.setAttribute('download', 'maplestory-custom-playlists.json');
    link.href = exportCustomPlaylists();
    link.click();
  };

  const onWipeCustomPlaylists = () => {
    if (window.confirm('Wipe all custom playlists?')) {
      resetCustomPlaylists();
    }
  };

  useEffect(() => {
    reader.onload = () => {
      const content = reader.result;
      if (typeof content !== 'string') {
        setFileError('File content not string');
        return;
      }
      try {
        const parsed = JSON.parse(content);
        if (parsed?.length) {
          // Array of playlists
          for (const pl of parsed) {
            if (!playlistSanityCheck(pl)) {
              setFileError('Incorrect JSON structure');
              return;
            }
          }
          setCustomPlaylists(parsed);
        } else {
          // Single playlist
          if (!playlistSanityCheck(parsed)) {
            setFileError('Incorrect JSON structure');
            return;
          }
          setCustomPlaylists([parsed]);
        }
      } catch (e) {
        setFileError('Cannot parse JSON');
      }
    };
  }, []);

  return (
    <div>
      <div
        css={css`
          @media (min-width: 1024px) {
            margin-right: 33vw;
          }
        `}
      >
        <h2>Playlist Builder</h2>
        <p>
          Import and export custom playlists. JSON structure can be found{' '}
          <a
            href="https://github.com/maplestory-music/maplebgm-db/blob/master/playlist/blockbuster/BlackHeaven.jsonc"
            target={'_blank'}
            rel="noreferrer"
          >
            here
          </a>
          ; track IDs may be copied from the Playlist page. Tracks can also be
          added to and removed from the Export Set on the Playlist page. The
          Export Set can be copied and cleared from the Playlist Settings
          dropdown.
        </p>
        <p
          css={css`
            color: red;
          `}
        >
          All custom playlists are stored in the browser's localStorage and may
          be cleared without notice. Export frequently and use at your own risk.
        </p>
      </div>

      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <h4>Import</h4>
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          <span>
            Import custom playlists from a JSON file.{' '}
            <span
              css={css`
                color: red;
              `}
            >
              This will overwrite existing custom playlists.
            </span>
          </span>
        </div>
        <div>
          <input
            type="file"
            accept=".json"
            onChange={onFileChange}
            onClick={onFileInputClick}
          />
          <button onClick={onFileImport}>Import</button>
          {fileError && (
            <div
              css={css`
                color: red;
              `}
            >
              Error: {fileError}
            </div>
          )}
        </div>
      </div>

      <div
        css={css`
          margin: 20px 0;
        `}
      >
        <h4>Export</h4>
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          <span>Export all custom playlists into a JSON file.</span>
        </div>
        <div>
          <button onClick={onFileExport}>Export</button>
        </div>
      </div>

      <div
        css={css`
          margin: 20px 0;
        `}
      >
        <h4>Reset</h4>
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          <span>
            If there are any issues, you can wipe all custom playlists.
          </span>
        </div>
        <div>
          <button onClick={onWipeCustomPlaylists}>Wipe</button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistBuilderPage;
