import styled, { css } from 'styled-components';

import { ReactComponent as PlaySvgIcon } from '../../../../../assets/icon/video-player/controls/play.svg';
import { ReactComponent as PauseSvgIcon } from '../../../../../assets/icon/video-player/controls/pause.svg';
import { ReactComponent as VolumeOnSvgIcon } from '../../../../../assets/icon/video-player/controls/volume-on.svg';
import { ReactComponent as VolumeOffSvgIcon } from '../../../../../assets/icon/video-player/controls/volume-off.svg';
import { ReactComponent as FullScreenSvgIcon } from '../../../../../assets/icon/video-player/controls/fullscreen.svg';
import { ReactComponent as TransparentPlaySvgIcon } from '../../../../../assets/icon/video-player/controls/transparent-play-icon.svg';

// ========================== controls bar ====================================//
export const ControlsBar = styled.ul`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: ${({ theme }) => `0 ${theme.SPACES.l} ${theme.SPACES.s} ${theme.SPACES.l} !important`};

  background-color: transparent;

  & > :not(:last-child) {
    margin-right: ${({ theme }) => theme.SPACES.xxs};
  }

  & > :last-child {
    justify-content: flex-end;
  }
`;

export const ControlsBarElement = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &[data-controls='progress-bar-element'] {
    display: flex;
    width: 100%;
    margin-right: ${({ theme }) => theme.SPACES.xxs};
  }

  &[data-controls='volume-element'] {
    position: relative;
    margin-left: auto;

    &:hover > [data-controls='volume-level-bar'] {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

// ========================= controls buttons ================================//
const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 25%;
  height: 25%;
  margin: 0;
  padding: 0;

  border: none;
  background-color: transparent;
  background-size: contain;
  cursor: pointer;
`;

export const PlayPauseButton = styled(ControlButton)`
  width: 1rem;
  height: 1rem;
`;

export const VolumeButton = styled(ControlButton)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const FullScreenButton = styled(ControlButton)`
  width: 1.5rem;
  height: 1.5rem;
`;

// ======================== progress bar =====================================//
const commonBarHeight = '0.25rem';

export const ProgressBar = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: ${commonBarHeight};
  margin: 0;
  border: none;
  border-radius: 1.125rem;
  cursor: pointer;
  background-color: ${({ theme }) => `${theme.COLORS.white}b5`}; // b5 - value for color opacity
`;

export const Progress = styled.span.attrs<{ defaultValue: number }, { style: { width: number } }>(
  ({ defaultValue }) => ({
    style: {
      width: defaultValue || 0
    }
  })
)`
  position: absolute;
  display: inline-block;
  inset: 0;
  height: 100%;

  background-color: ${({ theme }) => theme.COLORS.white};
`;

// =========================== volume bar ======================================//
export const VolumeBar = styled.div`
  position: absolute;
  top: -5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.SPACES.xxs};

  visibility: hidden;
  opacity: 0;
  pointer-events: none;

  transform: rotate(270deg);

  transition: all
    ${({ theme }) => `${theme.TRANSITIONS.duration.fast} ${theme.TRANSITIONS.function.easeInOut}`};
`;

const volumeLevel = css<{
  level: number;
  max: number | string;
  min: number | string;
}>`
  --range: ${({ max, min }) => Number(max) - Number(min)};
  --ratio: ${({ level, min }) => `calc(${Number(level) - Number(min)} / var(--range))`};
  --sx: calc(0.1% + var(--ratio) * (100% - 0.1%));
`;

const thumbSharedStyles = css`
  width: 0;
  height: 100%;
  background-color: transparent;
  border: none;
`;

const trackSharedStyles = css`
  height: ${commonBarHeight};
  border: none;
  border-radius: ${({ theme }) => theme.SPACES.xxs};
  background-color: ${({ theme }) => `${theme.COLORS.white}b5`}; // b5 - value for color opacity
  box-shadow: none;
`;

const progressSharedStyles = css`
  background: linear-gradient(${({ theme }) => `${theme.COLORS.white}, ${theme.COLORS.white}`}) 0 /
      var(--sx) 100% no-repeat,
    ${({ theme }) => `${theme.COLORS.white}b5`};
`;

export const VolumeLevelInput = styled.input`
  ${volumeLevel};

  height: ${commonBarHeight};
  margin: 0;
  cursor: pointer;

  &.styled-slider {
    -webkit-appearance: none;
    background-color: transparent;
  }

  &.styled-slider:focus {
    outline: none;
  }

  /*webkit*/
  &.styled-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${thumbSharedStyles}
  }

  &.styled-slider::-webkit-slider-runnable-track {
    ${trackSharedStyles}
  }

  &.styled-slider.slider-progress::-webkit-slider-runnable-track {
    ${progressSharedStyles}
  }

  /*mozilla*/
  &.styled-slider::-moz-range-thumb {
    ${thumbSharedStyles}
  }

  &.styled-slider::-moz-range-track {
    ${trackSharedStyles}
  }

  &.styled-slider.slider-progress::-moz-range-track {
    ${progressSharedStyles}
  }

  /*ms*/
  &.styled-slider::-ms-fill-upper {
    background: transparent;
    border-color: transparent;
  }

  &.styled-slider::-ms-fill-lower {
    background: transparent;
    border-color: transparent;
  }

  &.styled-slider::-ms-thumb {
    ${thumbSharedStyles}
    box-sizing: border-box;
  }

  &.styled-slider::-ms-track {
    ${trackSharedStyles}
    box-sizing: border-box;
  }

  &.styled-slider.slider-progress::-ms-fill-lower {
    height: max(calc(1em - 1px - 1px), 0px);
    margin: 0;
    background-color: ${({ theme }) => `${theme.COLORS.white}b5`}; // b5 - value for color opacity
    border-right-width: 0;
  }
`;

// ======================== controls svg icons ==============================//
const controlsSvgIconsShared = css`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.COLORS.white};
`;

export const PlayIcon = styled(PlaySvgIcon)`
  ${controlsSvgIconsShared}
`;

export const PauseIcon = styled(PauseSvgIcon)`
  ${controlsSvgIconsShared}
`;

export const VolumeOnIcon = styled(VolumeOnSvgIcon)`
  ${controlsSvgIconsShared}
`;

export const VolumeOffIcon = styled(VolumeOffSvgIcon)`
  ${controlsSvgIconsShared}
`;

export const FullScreenIcon = styled(FullScreenSvgIcon)`
  ${controlsSvgIconsShared}
  width: 80%;
  height: 80%;
`;

export const BigPlayButton = styled(TransparentPlaySvgIcon)`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 4rem;
  height: 4rem;

  border-radius: 50%;
  backdrop-filter: ${({ theme }) => `blur(${theme.SPACES.xxs})`};

  transform: translate(-50%, -50%);
`;
