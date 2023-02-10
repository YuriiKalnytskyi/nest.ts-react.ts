import styled, { css } from 'styled-components';

const sharedStyles = css`
  &:hover,
  &:focus,
  &:focus-within,
  &:focus-visible,
  &:active {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

export const VideoContainer = styled.figure<{
  width?: string;
  borderRadius?: string;
  height?: string;
  maxHeight?: string;
  bgColor?: string;
  isFullScreenMode?: boolean;
  maxWidth?: string;
}>`
  position: relative;
  width: 100%;
  background-color: ${({ bgColor, theme }) => bgColor ?? theme.COLORS.video_player_bg};

  max-width: ${({ maxWidth }) => maxWidth ?? '64rem'};
  max-height: ${({ maxHeight }) => maxHeight ?? 'initial'};

  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '100%'};

  margin: 0 auto;
  border: none;
  outline: none;
  border-radius: ${({ borderRadius }) => borderRadius ?? '0'};
  overflow: hidden;

  ${sharedStyles}

  ${({ isFullScreenMode, theme }) =>
    isFullScreenMode &&
    css`
      background-color: ${theme.COLORS.video_player_bg};
    `}
`;

export const Player = styled.video<{
  videoHeight?: string;
  maxVideoHeight?: string;
  isFullScreenMode?: boolean;
}>`
  display: block;
  width: 100%;
  height: ${({ videoHeight }) => videoHeight ?? '100%'};
  max-height: ${({ maxVideoHeight }) => maxVideoHeight ?? '100%'};

  cursor: pointer;

  ${sharedStyles}

  ${({ isFullScreenMode, theme }) =>
    isFullScreenMode &&
    css`
      background-color: ${theme.COLORS.video_player_bg};
    `}
`;
