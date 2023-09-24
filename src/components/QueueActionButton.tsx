/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dropdown } from 'react-bootstrap';

interface IQueueActionButtonProps {
  iconClass: string;
  actionName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  active?: boolean;
}

export const QueueActionButton: React.FC<IQueueActionButtonProps> = (props) => {
  const { iconClass, actionName, onClick, active } = props;
  return (
    <Dropdown.Item onClick={onClick} active={active}>
      <span>
        <i
          className={iconClass}
          css={css`
            width: 24px;
          `}
        ></i>
        {actionName}
      </span>
    </Dropdown.Item>
  );
};
