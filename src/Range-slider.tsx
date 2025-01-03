import { useRef, KeyboardEvent } from "react";

type TrackBarProps = {
  max: number;
  min: number;
  start?: number;
  end?: number;
  onChange: (start: number, end: number) => void;
  disabled?: boolean;
  customStyle?: {
    trackBar?: React.CSSProperties;
    track?: React.CSSProperties;
    button?: React.CSSProperties;
    viewValueContainer?: React.CSSProperties;
  };
};

export const TrackBar = (props: TrackBarProps) => {
  let progressButtonOne =
    props.start !== undefined
      ? (props.start - props.min) / (props.max - props.min)
      : 0;

  let progressButtonTwo =
    props.end !== undefined
      ? (props.end - props.min) / (props.max - props.min)
      : 1;

  progressButtonOne = Math.max(Math.min(1, progressButtonOne), 0);
  progressButtonTwo = Math.max(Math.min(1, progressButtonTwo), 0);

  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: MouseEvent | TouchEvent, type: "ONE" | "TWO") => {
    if (props.disabled) return;

    const clientX =
      event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;

    if (trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        Math.max(0, clientX - trackRect.left),
        trackRect.width
      );

      if (type === "ONE") {
        progressButtonOne = newProgress / trackRect.width;
      } else if (type === "TWO") {
        progressButtonTwo = newProgress / trackRect.width;
      }

      const newStart =
        Math.min(progressButtonOne, progressButtonTwo) *
          (props.max - props.min) +
        props.min;
      const newEnd =
        Math.max(progressButtonOne, progressButtonTwo) *
          (props.max - props.min) +
        props.min;

      props.onChange(
        parseFloat(newStart.toFixed(2)),
        parseFloat(newEnd.toFixed(2))
      );
    }
  };

  const startDragging = (type: "ONE" | "TWO", isTouch: boolean = false) => {
    if (props.disabled) return;

    const moveHandler = (e: MouseEvent | TouchEvent) => handleMove(e, type);

    const stopDragging = () => {
      window.removeEventListener(
        isTouch ? "touchmove" : "mousemove",
        moveHandler
      );
      window.removeEventListener(
        isTouch ? "touchend" : "mouseup",
        stopDragging
      );
    };

    window.addEventListener(isTouch ? "touchmove" : "mousemove", moveHandler);
    window.addEventListener(isTouch ? "touchend" : "mouseup", stopDragging);
  };

  const moveKeyboard = (
    event: KeyboardEvent<HTMLDivElement>,
    type: "ONE" | "TWO"
  ) => {
    if (props.disabled) return;

    const step = 0.01;
    const largeStep = 0.1;

    if (trackRef.current && props.max) {
      const trackRect = trackRef.current.getBoundingClientRect();

      const calculateNewProgress = (key: string, currentProgress: number) => {
        switch (key) {
          case "Home":
            return 0;
          case "End":
            return 1;
          case "PageUp":
            return Math.min(currentProgress + largeStep, 1);
          case "PageDown":
            return Math.max(currentProgress - largeStep, 0);
          case "ArrowRight":
          case "ArrowUp":
            return Math.min(currentProgress + step, 1);
          case "ArrowLeft":
          case "ArrowDown":
            return Math.max(currentProgress - step, 0);
          default:
            return currentProgress;
        }
      };

      if (type === "ONE") {
        progressButtonOne = calculateNewProgress(event.key, progressButtonOne);
      } else if (type === "TWO") {
        progressButtonTwo = calculateNewProgress(event.key, progressButtonTwo);
      }

      const newStartProgress =
        Math.min(progressButtonOne, progressButtonTwo) * trackRect.width;
      const newEndProgress =
        Math.max(progressButtonOne, progressButtonTwo) * trackRect.width;

      const newStart =
        (newStartProgress / trackRect.width) * (props.max - props.min) +
        props.min;
      const newEnd =
        (newEndProgress / trackRect.width) * (props.max - props.min) +
        props.min;

      props.onChange(
        parseFloat(newStart.toFixed(2)),
        parseFloat(newEnd.toFixed(2))
      );
    }
  };

  const spanWidth = Math.abs(progressButtonTwo - progressButtonOne) * 100;

  const handleClickOnTrack = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.disabled) return;

    if (trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const clickPosition = Math.min(
        Math.max(0, event.clientX - trackRect.left),
        trackRect.width
      );
      const clickProgress = clickPosition / trackRect.width;

      const distanceToButtonOne = Math.abs(clickProgress - progressButtonOne);
      const distanceToButtonTwo = Math.abs(clickProgress - progressButtonTwo);

      if (distanceToButtonOne < distanceToButtonTwo) {
        progressButtonOne = clickProgress;
        const newStart = clickProgress * (props.max - props.min) + props.min;
        const newEnd = progressButtonTwo * (props.max - props.min) + props.min;

        props.onChange(
          Math.min(
            parseFloat(newStart.toFixed(2)),
            parseFloat(newEnd.toFixed(2))
          ),
          Math.max(
            parseFloat(newStart.toFixed(2)),
            parseFloat(newEnd.toFixed(2))
          )
        );
      } else {
        progressButtonTwo = clickProgress;

        const newStart =
          progressButtonOne * (props.max - props.min) + props.min;
        const newEnd = clickProgress * (props.max - props.min) + props.min;
        props.onChange(
          Math.min(
            parseFloat(newStart.toFixed(2)),
            parseFloat(newEnd.toFixed(2))
          ),
          Math.max(
            parseFloat(newStart.toFixed(2)),
            parseFloat(newEnd.toFixed(2))
          )
        );
      }
    }
  };

  const valueButtonOne =
    progressButtonOne * (props.max - props.min) + props.min;
  const valueButtonTwo =
    progressButtonTwo * (props.max - props.min) + props.min;

  return (
    <div
      ref={trackRef}
      style={{
        display: "block",
        width: "100%",
        height: "10px",
        borderRadius: "50px",
        backgroundColor: props.disabled ? "#d3d3d3" : "#d9d9d9",
        position: "relative",
        cursor: props.disabled ? "default" : "pointer",
        userSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        ...props.customStyle?.trackBar,
      }}
      onClick={handleClickOnTrack}
    >
      <span
        style={{
          left: `${Math.min(progressButtonOne, progressButtonTwo) * 100}%`,
          width: `${spanWidth}%`,
          display: "block",
          position: "absolute",
          height: "10px",
          backgroundColor: "#3b95ff",
          filter: props.disabled ? "brightness(50%)" : "none",
          userSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
          WebkitUserSelect: "none",
          ...props.customStyle?.track,
        }}
      />

      <div
        tabIndex={0}
        onKeyDown={(e) => moveKeyboard(e, "ONE")}
        onMouseDown={() => startDragging("ONE")}
        onTouchStart={() => startDragging("ONE", true)}
        aria-orientation="horizontal"
        dir="ltr"
        aria-valuemin={props.min}
        aria-valuemax={props.max}
        aria-valuenow={parseFloat(valueButtonOne.toFixed(2))}
        role="slider"
        style={{
          left: `${
            ((valueButtonOne - props.min) / (props.max - props.min)) * 100
          }%`,
          display: "block",
          width: "20px",
          height: "20px",
          border: "none",
          position: "absolute",
          borderRadius: "50px",
          transform: "translate(-50%, -22.5%)",
          backgroundColor: "#3b95ff",
          cursor: props.disabled ? "default" : "pointer",
          filter: props.disabled ? "brightness(50%)" : "none",
          zIndex: 2,
          userSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
          WebkitUserSelect: "none",
          ...props.customStyle?.button,
        }}
      >
        <input
          type="text"
          hidden
          value={parseFloat(valueButtonOne.toFixed(2))}
          readOnly
        />
      </div>

      <div
        tabIndex={0}
        onKeyDown={(e) => moveKeyboard(e, "TWO")}
        onMouseDown={() => startDragging("TWO")}
        onTouchStart={() => startDragging("TWO", true)}
        aria-orientation="horizontal"
        dir="ltr"
        aria-valuemin={props.min}
        aria-valuemax={props.max}
        aria-valuenow={parseFloat(valueButtonTwo.toFixed(2))}
        role="slider"
        style={{
          left: `${
            ((valueButtonTwo - props.min) / (props.max - props.min)) * 100
          }%`,
          display: "block",
          width: "20px",
          height: "20px",
          border: "none",
          position: "absolute",
          borderRadius: "50px",
          transform: "translate(-50%, -22.5%)",
          backgroundColor: "#3b95ff",
          cursor: props.disabled ? "default" : "pointer",
          filter: props.disabled ? "brightness(50%)" : "none",
          zIndex: 2,
          userSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
          WebkitUserSelect: "none",
          ...props.customStyle?.button,
        }}
      >
        <input
          type="text"
          hidden
          value={parseFloat(valueButtonTwo.toFixed(2))}
          readOnly
        />
      </div>
    </div>
  );
};
