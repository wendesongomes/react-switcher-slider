The react-switcher-slider library provides a React component to create interactive control bars for adjusting audio intervals. It is highly customizable and easy to integrate into React projects.

Unique Feature: Unlike traditional sliders, this library doesn't require defining fixed start or end buttons. The button positioned at the beginning becomes the start, and if moved past the other button, their roles switch dynamically.

---

## Installation

Install the library via npm or yarn:

```bash
npm install react-switcher-slider
```

or

```bash
yarn add react-switcher-slider
```

Ensure you import the custom CSS file `Range-slider.css` into your project for styling.

---

## How to Use

### Importing

Import the component into your project:

```tsx
import React from "react";
import { TrackBar } from "react-switcher-slider";
```

### Available Properties

| Property              | Type                         | Description                                                         | Required |
| --------------------- | ---------------------------- | ------------------------------------------------------------------- | -------- |
| `url`                 | `string`                     | URL of the audio file.                                              | Yes      |
| `setValueA`           | `(start: number) => void`    | Function to set the start value of the interval.                    | Yes      |
| `setValueB`           | `(end: number) => void`      | Function to set the end value of the interval.                      | Yes      |
| `trackValueA`         | `number`                     | Initial value of the interval (in seconds).                         | No       |
| `trackValueB`         | `number`                     | Final value of the interval (in seconds).                           | No       |
| `handleOnLoading`     | `(loading: boolean) => void` | Callback function triggered during audio loading.                   | No       |
| `skeleton`            | `ReactElement`               | Element displayed while the audio is loading.                       | No       |
| `showValueInTracking` | `boolean`                    | Displays current interval values when interacting with the buttons. | No       |
| `customStyle`         | `object`                     | Custom styles for different component parts (detailed below).       | No       |

### `customStyle` Structure

| Key                  | Type                  | Description                     |
| -------------------- | --------------------- | ------------------------------- |
| `trackBar`           | `React.CSSProperties` | Styles for the main bar.        |
| `track`              | `React.CSSProperties` | Styles for the interval track.  |
| `button`             | `React.CSSProperties` | Styles for the buttons.         |
| `viewValueContainer` | `React.CSSProperties` | Styles for the value container. |

---

### Usage Example

Here is a complete example of how to use the `TrackBar` component in a React project:

```tsx
import React, { useState } from "react";
import { TrackBar } from "react-switcher-slider";

const App = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  return (
    <div>
      <h1>TrackBar Demo</h1>
      <TrackBar
        url="/videoplayback.m4a"
        setValueA={setStart}
        setValueB={setEnd}
        trackValueA={100}
        trackValueB={20}
        skeleton={<p>Loading.....</p>}
        showValueInTracking
        customStyle={{
          button: {
            background: "black",
          },
          track: {
            background: "black",
          },
          trackBar: {
            background: "blue",
          },
          viewValueContainer: {
            background: "red",
          },
        }}
      />
      <p>
        Selected interval: {start.toFixed(2)}s - {end.toFixed(2)}s
      </p>
    </div>
  );
};

export default App;
```

---

## Tips

- Ensure the audio file is accessible at the path provided in the `url` property.
- Use the `skeleton` property to enhance the user experience while the audio loads.
- Customize styles to align with your project's visual identity.

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests in the library's repository.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
