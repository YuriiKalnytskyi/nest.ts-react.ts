import React, { useRef, useState, useEffect } from 'react';

import {
  DocumentElementWithFullscreen,
  DocumentWithFullscreen,
  IPlayerOptions,
  IVideoPlayeriOSProps,
  TChangeProgressBarWidth
} from '../../types';
import { useAspectRatio, useDetectBrowserType } from '../../hooks';
import { ControlsBar } from './controls-bar';
import { BigPlayButton } from './controls-bar/controls-bar.styled';

import * as Styled from './video-player.styled';

const defaultOptions: IPlayerOptions = {
  preload: 'metadata',
  autoPlay: true,
  muted: true,
  playsInline: true,
  controls: false,
  loop: true
};

const defaultVolumeLevel = 50;

const videoTypes = ['video/mp4', 'video/webp', 'video/ogg'];

export const VideoPlayer = ({
  src,
  borderRadius,
  width,
  height,
  videoHeight,
  maxHeight,
  maxVideoHeight,
  bgColor,
  withResize,
  maxWidth,
  options = {}
}: IVideoPlayeriOSProps) => {
  const playerOptions = { ...defaultOptions, ...options };

  const [isPaused, setIsPaused] = useState<boolean>(
    !playerOptions.autoPlay || !playerOptions.playsInline
  );
  const [isMuted, setIsMuted] = useState<boolean>(playerOptions.muted ?? false);
  const [isFullScreenMode, setIsFullScreenMode] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<number>(defaultVolumeLevel);
  const [progressBarMax, setProgressBarMax] = useState<number>(0);
  const [progressBarValue, setProgressBarValue] = useState<number>(0);

  const { isSafari } = useDetectBrowserType();

  const videoContainerRef = useRef<HTMLElement | null>(null);
  const playerRef = useRef<DocumentElementWithFullscreen | null>(null);
  const doc = document as DocumentWithFullscreen;

  const [resizedVideoHeght] = useAspectRatio(withResize ? videoContainerRef.current : null);

  useEffect(() => {
    if (videoContainerRef.current && withResize) {
      videoContainerRef.current.style.height = resizedVideoHeght;
    }
  }, [resizedVideoHeght, withResize]);

  const fullscreenElement = () =>
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement;

  const requestFullscreen =
    playerRef.current?.requestFullscreen ||
    playerRef.current?.webkitRequestFullscreen ||
    playerRef.current?.mozRequestFullScreen ||
    playerRef.current?.msRequestFullscreen ||
    playerRef.current?.webkitEnterFullscreen ||
    playerRef.current?.webkitEnterFullScreen;

  const exitFullscreen =
    doc.exitFullscreen ||
    doc.webkitCancelFullScreen ||
    doc.mozCancelFullScreen ||
    doc.msExitFullscreen ||
    doc.webkitExitFullscreen ||
    doc.webkitExitFullScreen;

  const onTogglePlayPause = () => {
    if (playerRef.current) {
      if (playerRef.current.paused || playerRef.current.ended) {
        playerRef.current.play();
        playerRef.current.blur();
        videoContainerRef.current?.blur();
      } else {
        playerRef.current.pause();
      }
    }
  };

  const onToggleVolume = () => {
    if (playerRef.current) {
      if (playerRef.current.muted) {
        setIsMuted(false);
        playerRef.current.muted = false;
      } else {
        setIsMuted(true);
        playerRef.current.muted = true;
      }
    }
  };

  const onFullScreenToggle = (changeProgressBarWidth: TChangeProgressBarWidth) => {
    if (requestFullscreen) {
      // if is Safari agent showing standart Safari video player
      if (isSafari) {
        if (playerRef.current === fullscreenElement()) {
          // exit fullscreen
          exitFullscreen.call(document);
          setIsFullScreenMode(false);
        } else {
          // enter fullscreen
          requestFullscreen.call(playerRef.current);
          setIsFullScreenMode(true);
        }
      } else {
        // if any else browser showing custom styled video player
        // by requesting fullscreen from container not video player itself
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullScreenMode(false);
        }
        if (videoContainerRef.current) {
          videoContainerRef.current.requestFullscreen();
          setIsFullScreenMode(true);
        }
      }
    } else if (playerRef.current?.webkitSupportsFullscreen) {
      // iOS allows fullscreen of the video itself
      if (doc.webkitDisplayingFullscreen) {
        // exit ios fullscreen
        if (playerRef.current?.webkitExitFullscreen) {
          playerRef.current.webkitExitFullscreen();
          setIsFullScreenMode(false);
        } else if (playerRef.current?.webkitExitFullScreen) {
          playerRef.current.webkitExitFullScreen();
          setIsFullScreenMode(false);
        }
      } else {
        // enter ios fullscreen
        if (playerRef.current?.webkitEnterFullscreen) {
          playerRef.current?.webkitEnterFullscreen();
          setIsFullScreenMode(true);
        }
        if (playerRef.current?.webkitEnterFullScreen) {
          playerRef.current.webkitEnterFullScreen();
          setIsFullScreenMode(true);
        }
      }
    }

    changeProgressBarWidth();
  };

  const onPlayPause: React.ReactEventHandler<HTMLVideoElement> = (event) => {
    setIsPaused(event.currentTarget.paused);
  };

  const onLoadedMetadata = () => {
    if (playerRef.current) {
      setProgressBarMax(playerRef.current.duration);
    }
  };

  const onTimeUpdate = () => {
    if (playerRef.current) {
      setProgressBarValue(playerRef.current.currentTime);
    }
  };

  const onVolumeChange = (level: number) => {
    if (playerRef.current) {
      if (playerRef.current.muted || level) {
        setVolumeLevel(level);
        playerRef.current.volume = level / 100 ?? 0.5;
        playerRef.current.muted = false;
        setIsMuted(false);
      } else {
        playerRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const onProgressSkip = (position: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = position * playerRef.current.duration;
    }
  };

  return (
    <Styled.VideoContainer
      ref={videoContainerRef}
      borderRadius={borderRadius}
      width={width}
      height={height}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      bgColor={bgColor}
      isFullScreenMode={isFullScreenMode}
    >
      <Styled.Player
        ref={playerRef}
        onPlay={onPlayPause}
        onPause={onPlayPause}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onClick={onTogglePlayPause}
        videoHeight={isFullScreenMode ? '100%' : videoHeight}
        maxVideoHeight={maxVideoHeight}
        isFullScreenMode={isFullScreenMode}
        {...playerOptions}
      >
        {videoTypes.map((type) => (
          <source key={type} src={src} type={type} />
        ))}
      </Styled.Player>

      {isPaused ? <BigPlayButton aria-label='play button' onClick={onTogglePlayPause} /> : null}

      <ControlsBar
        onTogglePlayPause={onTogglePlayPause}
        onToggleVolume={onToggleVolume}
        onFullScreenToggle={onFullScreenToggle}
        onVolumeChange={onVolumeChange}
        isMuted={isMuted}
        isPaused={isPaused}
        isFullScreenMode={isFullScreenMode}
        volumeLevel={volumeLevel}
        progressBarMax={progressBarMax}
        progressBarValue={progressBarValue}
        onProgressSkip={onProgressSkip}
      />
    </Styled.VideoContainer>
  );
};
