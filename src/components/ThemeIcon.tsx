/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface IThemeIconProps {
  theme: 'light' | 'dark';
  margin?: boolean;
}

export const ThemeIcon: React.FC<IThemeIconProps> = (props) => {
  const { theme, margin } = props;
  const iconClass = theme === 'light' ? 'fa fa-sun' : 'fa fa-moon';
  return (
    <i
      className={iconClass}
      css={css`
        width: 16px;
        height: 16px;
        text-align: center;
        margin-right: ${margin ? '5px' : undefined};
      `}
    />
  );
};
