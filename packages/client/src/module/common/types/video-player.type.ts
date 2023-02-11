import { HTMLAttributes } from 'react';

export interface DocumentWithFullscreen extends Document {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  webkitDisplayingFullscreen?: boolean;
  msExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  webkitExitFullScreen?: () => Promise<void>;
  webkitCancelFullScreen?: () => Promise<void>;
}

export interface DocumentElementWithFullscreen extends HTMLVideoElement {
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  webkitEnterFullscreen?: () => Promise<void>;
  webkitEnterFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  webkitExitFullScreen?: () => Promise<void>;
  webkitSupportsFullscreen?: boolean;
}

export type TChangeProgressBarWidth = () => void;

export interface IControlsBarProps {
  onTogglePlayPause: () => void;
  onToggleVolume: () => void;
  onFullScreenToggle: (callback: TChangeProgressBarWidth) => void;
  onProgressSkip: (position: number) => void;
  onVolumeChange: (level: number) => void;
  isMuted: boolean;
  isPaused: boolean;
  isFullScreenMode: boolean;
  volumeLevel: number;
  progressBarMax: number;
  progressBarValue: number;
}

export interface IVideoPlayeriOSProps extends HTMLAttributes<HTMLVideoElement> {
  src: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  maxHeight?: string;
  videoHeight?: string;
  maxVideoHeight?: string;
  bgColor?: string;
  withResize?: boolean;
  maxWidth?: string;
  options?: IPlayerOptions;
}

export interface IPlayerOptions {
  preload?: string;
  autoPlay?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  loop?: boolean;
}
