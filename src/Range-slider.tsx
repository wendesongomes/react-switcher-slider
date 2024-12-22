import { useState, useRef, ReactElement } from "react";
import "./styles.css";

type TrackBarProps = {
  url: string;
  setValueA: (start: number) => void;
  setValueB: (end: number) => void;
  trackValueA?: number;
  trackValueB?: number;
  handleOnLoading?: (loading: boolean) => void;
  skeleton?: ReactElement;
  showValueInTracking?: boolean;
  customStyle?: {
    trackBar?: React.CSSProperties;
    track?: React.CSSProperties;
    button?: React.CSSProperties;
    viewValueContainer?: React.CSSProperties;
  };
};

export const TrackBar = (props: TrackBarProps) => {
  const [progressButtonOne, setProgressButtonOne] = useState(0);
  const [progressButtonTwo, setProgressButtonTwo] = useState(1);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const getDuration = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setAudioDuration(e.currentTarget.duration);

    if (props.trackValueA) {
      const startPosition = props.trackValueA / e.currentTarget.duration;
      setProgressButtonOne(startPosition);
    } else {
      props.setValueA(0);
    }

    if (props.trackValueB) {
      const endPosition = props.trackValueB / e.currentTarget.duration;
      setProgressButtonTwo(endPosition);
    } else {
      props.setValueB(e.currentTarget.duration);
    }

    if (props.handleOnLoading) {
      props.handleOnLoading(false);
    }
  };

  const handleMouseMove = (e: MouseEvent, type: "ONE" | "TWO") => {
    if (trackRef.current && audioDuration) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        Math.max(0, e.clientX - trackRect.left),
        trackRect.width
      );
      let updatedButtonOne = progressButtonOne;
      let updatedButtonTwo = progressButtonTwo;

      if (type === "ONE") {
        updatedButtonOne = newProgress / trackRect.width;
        setProgressButtonOne(updatedButtonOne);
      } else if (type === "TWO") {
        updatedButtonTwo = newProgress / trackRect.width;
        setProgressButtonTwo(updatedButtonTwo);
      }

      const newStart =
        Math.min(updatedButtonOne, updatedButtonTwo) * audioDuration;

      const newEnd =
        Math.max(updatedButtonOne, updatedButtonTwo) * audioDuration;

      props.setValueA(newStart);
      props.setValueB(newEnd);
    }
  };

  const startDragging = (type: "ONE" | "TWO") => {
    const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, type);
    const stopDragging = () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", stopDragging);
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", stopDragging);
  };

  const spanWidth = Math.abs(progressButtonTwo - progressButtonOne) * 100;

  const startTime = progressButtonOne * audioDuration;
  const endTime = progressButtonTwo * audioDuration;

  const formatAudioDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <audio
        src={props.url}
        ref={audioRef}
        onCanPlayThrough={(e) => {
          getDuration(e);
        }}
        onLoadStart={() => props.handleOnLoading && props.handleOnLoading(true)}
      />

      {audioDuration ? (
        <div
          ref={trackRef}
          className="trackBar"
          style={props.customStyle?.trackBar}
        >
          <span
            className="track"
            style={{
              left: `${Math.min(progressButtonOne, progressButtonTwo) * 100}%`,
              width: `${spanWidth}%`,
              ...props.customStyle?.track,
            }}
          ></span>

          <button
            onMouseDown={() => startDragging("ONE")}
            style={{
              left: `${progressButtonOne * 100}%`,
              ...props.customStyle?.button,
            }}
            className="button"
          >
            {props.showValueInTracking && (
              <div
                className="viewValueContainer"
                style={props.customStyle?.viewValueContainer}
              >
                <p>{formatAudioDuration(startTime)}</p>
              </div>
            )}
          </button>

          <button
            onMouseDown={() => startDragging("TWO")}
            className="button"
            style={{
              left: `${progressButtonTwo * 100}%`,
              ...props.customStyle?.button,
            }}
          >
            {props.showValueInTracking && (
              <div
                className="viewValueContainer"
                style={props.customStyle?.viewValueContainer}
              >
                <p>{formatAudioDuration(endTime)}</p>
              </div>
            )}
          </button>
        </div>
      ) : (
        props.skeleton
      )}
    </>
  );
};
