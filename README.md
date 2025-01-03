<div align="center">
  <img src="https://github.com/user-attachments/assets/cd553e83-3a03-42db-9eb3-61700d4a74e0" alt="Descrição da Imagem">
</div>

# react-switcher-slider

The react-switcher-slider library provides a React component to create customizable track bars for adjusting intervals. This slider component is highly interactive and dynamically switches the roles of start and end buttons when they cross each other.

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

---

## How to Use

### Importing

Import the component into your project:

```tsx
import React from "react";
import { TrackBar } from "react-switcher-slider";
```

### Available Properties

| Property      | Type                                  | Description                                                  | Required |
| ------------- | ------------------------------------- | ------------------------------------------------------------ | -------- |
| `max`         | `number`                              | Maximum value for the interval.                              | Yes      |
| `min`         | `number`                              | Minimum value for the interval.                              | Yes      |
| `start`       | `number`                              | The starting value of the interval (optional).               | No       |
| `end`         | `number`                              | The ending value of the interval (optional).                 | No       |
| `onChange`    | `(start: number,end: number) => void` | Callback function triggered when the interval changes.       | Yes      |
| `disabled`    | `boolean`                             | Disables the track bar when true.                            | Yes      |
| `customStyle` | `object`                              | Custom styles for various parts of the component (optional). | No       |

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
    <>
      <h1>TrackBar Demo</h1>
      <TrackBar
        max={100}
        min={0}
        start={start}
        end={end}
        onChange={(newStart, newEnd) => {
          setStart(newStart);
          setEnd(newEnd);
        }}
        customStyle={{
          button: {
            backgroundColor: "blue",
          },
          track: {
            backgroundColor: "gray",
          },
          trackBar: {
            backgroundColor: "lightblue",
          },
        }}
      />
      <p>
        Selected interval: {start.toFixed(2)} - {end.toFixed(2)}
      </p>
    </>
  );
};

export default App;
```

---

## Key Features

- Dynamic Role Switching: The start and end buttons automatically switch positions if they cross each other, creating a smooth user experience.
- Keyboard and Mouse Interaction: Supports both mouse and keyboard inputs, with arrow keys, home, and end keys for precise adjustments.
- Customizable Styles: You can easily customize the track bar and buttons using the customStyle prop.
- Accessibility: The component is fully accessible, with proper ARIA attributes and keyboard navigation.

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests in the library's repository.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
