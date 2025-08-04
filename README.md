# WebXR UI Library - Modular 2D Cards

A React-based WebXR library featuring modular 2D card components for Three.js applications. This library provides customizable, interactive cards that can be used in VR/AR experiences.

## Features

- **Modular Design**: Highly customizable card components with dynamic props
- **WebXR Support**: Built-in VR and AR session management
- **Interactive Elements**: Click and hover effects with customizable callbacks
- **Dynamic Content**: Support for titles, content text, and images
- **Flexible Styling**: Customizable colors, borders, transparency, and animations
- **Grid Layout**: Automatic card grid positioning with configurable spacing

## Installation

```bash
npm install
npm run dev
```

## Usage

### Basic Card Example

```tsx
import { XRScene } from "./components/XRScene";
import { XRCardProps } from "./components/XRCard";

const cards: XRCardProps[] = [
  {
    title: "My Card",
    content: "This is a simple card with basic content.",
    backgroundColor: "#ffffff",
    borderColor: "#333333",
    borderWidth: 0.02,
    clickable: true,
    onCardClick: () => console.log("Card clicked!"),
    hoverScale: 1.1,
  },
];

function App() {
  return (
    <XRScene
      cards={cards}
      enableVR={true}
      enableAR={false}
      backgroundColor="#f0f0f0"
    />
  );
}
```

### Card Props Interface

```tsx
interface XRCardProps {
  // Position and size
  position?: [number, number, number];
  width?: number;
  height?: number;

  // Visual properties
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;

  // Content
  title?: string;
  content?: string;
  imageUrl?: string;

  // Interactive properties
  clickable?: boolean;
  onCardClick?: () => void;

  // Animation properties
  hoverScale?: number;
  animationSpeed?: number;

  // Material properties
  opacity?: number;
  transparent?: boolean;
}
```

### Advanced Example with Multiple Cards

```tsx
const advancedCards: XRCardProps[] = [
  {
    title: "Interactive Card",
    content: "This card has hover effects and click interactions.",
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
    borderWidth: 0.03,
    clickable: true,
    onCardClick: () => alert("Card clicked!"),
    hoverScale: 1.15,
  },
  {
    title: "Large Card",
    content: "This is a larger card with custom dimensions.",
    width: 1.5,
    height: 0.8,
    backgroundColor: "#fff3e0",
    borderColor: "#ff9800",
    borderWidth: 0.02,
    clickable: true,
    onCardClick: () => console.log("Large card clicked!"),
    hoverScale: 1.05,
  },
  {
    title: "Transparent Card",
    content: "This card has transparency effects.",
    backgroundColor: "#ffffff",
    borderColor: "#666666",
    borderWidth: 0.01,
    opacity: 0.7,
    transparent: true,
    clickable: false,
  },
];
```

### Grid Layout Helper

The library includes a helper function to automatically position cards in a grid:

```tsx
import { createCardGrid } from "./components/XRCard";

const gridCards = createCardGrid(cards, {
  rows: 2,
  cols: 3,
  spacing: 1.5,
  startPosition: [-2, 1, -2],
});
```

## WebXR Features

### VR Support

- Automatic VR session detection
- VR button creation and management
- Immersive VR experience with proper camera positioning

### AR Support

- AR session initialization (when available)
- Hit testing capabilities
- DOM overlay support

### Session Management

```tsx
// The WebXRManager handles session creation and management
const webXRManager = new WebXRManager(renderer, scene, camera, {
  enableVR: true,
  enableAR: false,
  referenceSpace: "local-floor",
});
```

## Customization Options

### Visual Customization

- **Colors**: Custom background and border colors
- **Borders**: Configurable border width and color
- **Transparency**: Opacity and transparency settings
- **Size**: Custom width and height dimensions

### Interactive Features

- **Click Events**: Custom click handlers for each card
- **Hover Effects**: Configurable hover scaling
- **Animation Speed**: Adjustable animation timing

### Content Support

- **Text Rendering**: Canvas-based text rendering with wrapping
- **Image Support**: Texture loading for card images
- **Dynamic Content**: Real-time content updates

## Browser Compatibility

- Chrome 79+ (with WebXR Device API)
- Firefox 68+ (with WebXR Device API)
- Edge 79+ (with WebXR Device API)
- Safari 13+ (limited WebXR support)

## Development

### Project Structure

```
webxr-ui-lib/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # App layout
│   └── globals.css       # Global styles
├── components/
│   ├── XRCard.tsx        # Modular card component
│   └── XRScene.tsx       # Three.js scene wrapper
├── utils/
│   └── webxr.ts          # WebXR session management
└── package.json
```

### Key Dependencies

- **Three.js**: 3D graphics library
- **React**: UI framework
- **Next.js**: React framework
- **WebXR Polyfill**: Cross-browser WebXR support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see package.json for details.

## Support

For issues and questions, please open an issue on the GitHub repository.
