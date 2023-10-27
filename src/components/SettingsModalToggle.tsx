/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface ISettingsModalToggleProps {
  id: string;
  label: string;
  checked: boolean;
  tooltip: string;
  onChange: () => void;
}

export const SettingsModalToggle: React.FC<ISettingsModalToggleProps> = ({
  id,
  label,
  checked,
  tooltip,
  onChange,
}) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <Form.Check
        type="switch"
        id={`${id}-switch`}
        label={label}
        checked={checked}
        onChange={onChange}
      />
      <OverlayTrigger
        delay={{ show: 250, hide: 100 }}
        placement="right"
        overlay={<Tooltip id={`tooltip-${id}`}>{tooltip}</Tooltip>}
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
  );
};
