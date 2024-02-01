/** @jsxImportSource @emotion/react */
import React, { useCallback, useMemo } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { css } from '@emotion/react';
import { getKey } from '../utils/PlaylistUtils';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { trackExportSetAtom } from '../../state/playlist';
import { useSettings } from '../../context/SettingsContext';

export const TrackIdRenderer: React.FC<ICellRendererParams> = (params) => {
  const { settings } = useSettings();
  const { data } = params;
  const key = useMemo(() => getKey(data.source.structure, data.filename), [
    data.source.structure,
    data.filename,
  ]);
  const [trackExportSet, setTrackExportSet] = useAtom(trackExportSetAtom);
  const trackInExportSet = useMemo(() => trackExportSet.has(key), [
    key,
    trackExportSet,
  ]);

  const onCopyTrackId = useCallback(() => {
    if (settings.jsonOptimizedTrackIdCopy) {
      navigator.clipboard.writeText(`"${key}",\n`);
    } else {
      navigator.clipboard.writeText(key);
    }
  }, [key, settings.jsonOptimizedTrackIdCopy]);

  const onExportSetChange = () => {
    if (trackInExportSet) {
      trackExportSet.delete(key);
    } else {
      trackExportSet.add(key);
    }
    const newSet = new Set(trackExportSet);
    setTrackExportSet(newSet);
  };

  return (
    <span
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        css={css`
          margin: 0 5px;
        `}
        onClick={onCopyTrackId}
      >
        <OverlayTrigger
          delay={{ show: 1000, hide: 100 }}
          overlay={
            <Tooltip id={`tooltip-copy-track-id`}>Copy Track ID</Tooltip>
          }
        >
          <i
            css={css`
              cursor: pointer;
            `}
            className={'fa-regular fa-copy'}
          />
        </OverlayTrigger>
      </div>
      <div onClick={onExportSetChange}>
        <OverlayTrigger
          delay={{ show: 1000, hide: 100 }}
          overlay={
            <Tooltip id={`tooltip-export`}>
              {trackInExportSet
                ? 'Remove from Export Set'
                : 'Add to Export Set'}
            </Tooltip>
          }
        >
          <i
            css={css`
              cursor: pointer;
              color: ${trackInExportSet ? 'red' : 'green'};
            `}
            className={`fa-regular ${
              trackInExportSet ? 'fa-square-minus' : 'fa-square-plus'
            }`}
          />
        </OverlayTrigger>
      </div>
    </span>
  );
};
