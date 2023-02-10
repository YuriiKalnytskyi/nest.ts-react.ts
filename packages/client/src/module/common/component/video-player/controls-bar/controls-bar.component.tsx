import React, { useEffect, useRef, useState } from 'react';

import { IControlsBarProps } from '../../../types';
import * as Styled from './controls-bar.styled';

export const ControlsBar = ({
  onTogglePlayPause,
  onToggleVolume,
  onFullScreenToggle,
  onProgressSkip,
  onVolumeChange,
  isPaused,
  isMuted,
  progressBarMax,
  progressBarValue,
  volumeLevel,
  isFullScreenMode
}: IControlsBarProps) => {
  const [progressWidth, setProgressWidth] = useState<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      const width = progressBarRef.current.offsetWidth;

      setProgressWidth(width);
    }
  }, [progressBarValue, isFullScreenMode]);

  const changeProgressBarWidth = () => {
    if (progressBarRef.current) {
      const width = progressBarRef.current.offsetWidth;

      setProgressWidth(width);
    }
  };

  const handleFullScreenToggle = () => {
    onFullScreenToggle(changeProgressBarWidth);
  };

  const calculateProgressBarWidth = () => {
    if (!progressBarValue || !progressWidth) {
      return 0;
    }

    const progressStep = progressWidth / progressBarMax;
    const currentProgress = progressStep * progressBarValue;

    return currentProgress;
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const pos = (event.pageX - rect.left) / event.currentTarget.offsetWidth;

    onProgressSkip(pos);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(+event.currentTarget.value);
  };

  return (
    <Styled.ControlsBar>
      {/* play pause button */}
      <Styled.ControlsBarElement>
        <Styled.PlayPauseButton
          type="button"
          onClick={onTogglePlayPause}
          aria-label="play pause control"
        >
          {isPaused ? <Styled.PlayIcon /> : <Styled.PauseIcon />}
        </Styled.PlayPauseButton>
      </Styled.ControlsBarElement>

      {/* progress bar */}
      <Styled.ControlsBarElement data-controls="progress-bar-element">
        <Styled.ProgressBar
          onClick={handleProgressClick}
          data-controls="progress-bar"
          ref={progressBarRef}
          aria-label="video duration bar"
        >
          <Styled.Progress defaultValue={calculateProgressBarWidth()} />
        </Styled.ProgressBar>
      </Styled.ControlsBarElement>

      {/* volume button */}
      <Styled.ControlsBarElement data-controls="volume-element">
        <Styled.VolumeButton type="button" onClick={onToggleVolume} aria-label="volume control">
          {isMuted ? <Styled.VolumeOffIcon /> : <Styled.VolumeOnIcon />}
        </Styled.VolumeButton>

        <Styled.VolumeBar data-controls="volume-level-bar" aria-label="volume level bar">
          <Styled.VolumeLevelInput
            type="range"
            min="0"
            max="100"
            value={volumeLevel}
            onChange={handleVolumeChange}
            level={volumeLevel}
            className="styled-slider slider-progress"
          />
        </Styled.VolumeBar>
      </Styled.ControlsBarElement>

      {/* fullscreen button */}
      <Styled.ControlsBarElement>
        <Styled.FullScreenButton
          type="button"
          onClick={handleFullScreenToggle}
          aria-label="fullscreen control"
        >
          <Styled.FullScreenIcon />
        </Styled.FullScreenButton>
      </Styled.ControlsBarElement>
    </Styled.ControlsBar>
  );
};
