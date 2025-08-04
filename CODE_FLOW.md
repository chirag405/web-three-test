# WebXR UI Library - Code Flow Documentation

## Overview

This is a modular WebXR UI library built with Next.js, Three.js, and TypeScript. It provides a flexible system for creating 3D components that can be rendered in WebXR environments.

## Project Structure

```
webxr-ui-lib/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx          # Main entry point
├── components/
│   ├── Card2D.tsx        # 2D card component
│   └── WireframeRoom.tsx # Wireframe room component
├── scenes/
│   └── XRScene.tsx       # Main XR scene manager (includes VRButton)
├── utils/
│   └── webxr.ts          # WebXR utilities
└── package.json
```

## Full Code Flow

### 1. Application Entry Point (`app/page.tsx`)

```typescript
// Main page component that sets up the XR scene
export default function Home() {
  // Define component properties
  const cardProps: Card2DProps = {
    /* ... */
  };
  const wireframeRoomProps: WireframeRoomProps = {
    /* ... */
  };

  // Create modular components
  const components = [
    createCardComponent(cardProps),
    createWireframeRoomComponent(wireframeRoomProps),
  ];

  // Render XR scene with components
  return <XRScene components={components} enableVR={true} />;
}
```

**Flow:**

1. **Component Definition**: Define properties for each 3D component
2. **Component Creation**: Use helper functions to create XRComponent instances
3. **Scene Rendering**: Pass components array to XRScene

### 2. XR Scene Manager (`scenes/XRScene.tsx`)

#### Core Interfaces

```typescript
// Generic interface for any 3D component
export interface XRComponent {
  id: string;
  create: () => THREE.Object3D;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

interface XRSceneProps {
  components?: XRComponent[];
  enableVR?: boolean;
  backgroundColor?: string;
}
```

#### Main XRScene Component Flow

```typescript
export function XRScene({ components = [], enableVR = true }) {
  // 1. Setup Three.js scene, camera, renderer
  // 2. Initialize WebXR manager
  // 3. Add lighting
  // 4. Process all components
  // 5. Start render loop
  // 6. Render VR button (defined inline)
}
```

**Detailed Flow:**

1. **Scene Initialization**

   ```typescript
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
   ```

2. **Lighting Setup**

   ```typescript
   const ambientLight = new THREE.HemisphereLight(0x606060, 0x404040, 0.8);
   const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
   const pointLight = new THREE.PointLight(0xffffff, 0.5);
   ```

3. **WebXR Initialization**

   ```typescript
   const webXRManager = new WebXRManager(renderer, scene, camera, {
     enableVR,
     enableAR: false,
     referenceSpace: "local-floor",
   });
   ```

4. **Component Processing**

   ```typescript
   components.forEach((component) => {
     const object = component.create();

     // Apply transformations
     if (component.position) object.position.set(...component.position);
     if (component.rotation) object.rotation.set(...component.rotation);
     if (component.scale) object.scale.set(...component.scale);

     scene.add(object);
   });
   ```

5. **Render Loop**

   ```typescript
   function render() {
     renderer.render(scene, camera);
   }
   renderer.setAnimationLoop(render);
   ```

6. **VR Button (Inline Component)**
   ```typescript
   function VRButton({ onEnterVR, className = "" }: VRButtonProps) {
     return (
       <button
         onClick={onEnterVR}
         style={
           {
             /* styles */
           }
         }
       >
         🥽 Enter VR
       </button>
     );
   }
   ```

### 3. Component System

#### Helper Functions (`scenes/XRScene.tsx`)

```typescript
// Convert component props to XRComponent instances
export function createCardComponent(props: Card2DProps): XRComponent {
  return {
    id: `card-${Date.now()}`,
    create: () => createCard2D(props),
    position: props.position,
    rotation: props.rotation,
  };
}

export function createWireframeRoomComponent(
  props: WireframeRoomProps
): XRComponent {
  return {
    id: `wireframe-room-${Date.now()}`,
    create: () => createWireframeRoom(props),
    position: props.position,
    rotation: props.rotation,
  };
}
```

### 4. Individual Components

#### Card2D Component (`components/Card2D.tsx`)

```typescript
export function createCard2D(props: Card2DProps): THREE.Group {
  // 1. Create card geometry and material
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });

  // 2. Add border using EdgesGeometry
  const borderGeometry = new THREE.EdgesGeometry(geometry);
  const border = new THREE.LineSegments(borderGeometry, borderMaterial);

  // 3. Create text using Canvas texture
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // Draw text on canvas
  const texture = new THREE.CanvasTexture(canvas);
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // 4. Group all elements
  const group = new THREE.Group();
  group.add(mesh, border, textMesh);

  return group;
}
```

#### WireframeRoom Component (`components/WireframeRoom.tsx`)

```typescript
export function createWireframeRoom(props: WireframeRoomProps): THREE.Group {
  // 1. Create wireframe material
  const material = new THREE.LineBasicMaterial({
    color,
    linewidth,
    transparent: true,
  });

  // 2. Helper function for creating wireframe lines
  function createWireframeLines(
    vertices: number[],
    indices: number[]
  ): THREE.LineSegments {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(vertices);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    return new THREE.LineSegments(geometry, material);
  }

  // 3. Create floor, ceiling, and walls
  const floor = createWireframeLines(floorVertices, floorIndices);
  const ceiling = createWireframeLines(ceilingVertices, ceilingIndices);
  const walls = createWireframeLines(wallVertices, wallIndices);

  // 4. Group all wireframe elements
  const group = new THREE.Group();
  group.add(floor, ceiling, walls);

  return group;
}
```

### 5. WebXR Utilities (`utils/webxr.ts`)

```typescript
export class WebXRManager {
  constructor(renderer, scene, camera, options) {
    // Initialize WebXR session management
  }

  async initialize() {
    // Check WebXR support and setup
  }

  setupXR() {
    // Configure XR session
  }

  startVRSession() {
    // Enter VR mode
  }
}
```

## Data Flow Summary

1. **Entry Point** (`page.tsx`)

   - Define component properties
   - Create XRComponent instances using helper functions
   - Pass to XRScene

2. **Scene Management** (`XRScene.tsx`)

   - Initialize Three.js environment
   - Setup WebXR capabilities
   - Process all components
   - Apply transformations
   - Start render loop
   - Render VR button (inline component)

3. **Component Creation** (Individual component files)

   - Create Three.js geometries and materials
   - Build complex objects (cards, wireframes)
   - Return THREE.Group with all elements

4. **Rendering**
   - Three.js renderer displays all components
   - WebXR manager handles VR/AR functionality
   - Continuous render loop updates scene
   - VR button provides user interaction

## Key Features

### ✅ Modularity

- **Generic XRComponent interface** allows any 3D object
- **Helper functions** convert component props to XRComponent instances
- **Easy to add new components** - just create component + helper function

### ✅ Flexibility

- **Independent positioning** for each component
- **Customizable properties** (color, size, text, etc.)
- **Transform support** (position, rotation, scale)

### ✅ WebXR Ready

- **VR/AR support** through WebXR API
- **Session management** for entering/exiting XR
- **Device compatibility** checking

### ✅ Type Safety

- **TypeScript interfaces** for all components
- **Compile-time checking** for component properties
- **IntelliSense support** for development

### ✅ Inline Components

- **VRButton defined inline** in XRScene for better cohesion
- **Reduced file count** and simpler imports
- **Component-specific styling** contained within usage context

## Adding New Components

To add a new component (e.g., a 3D button):

1. **Create component file** (`components/Button3D.tsx`)

   ```typescript
   export interface Button3DProps {
     // Define properties
   }

   export function createButton3D(props: Button3DProps): THREE.Group {
     // Create Three.js objects
   }
   ```

2. **Add helper function** in `XRScene.tsx`

   ```typescript
   export function createButtonComponent(props: Button3DProps): XRComponent {
     return {
       id: `button-${Date.now()}`,
       create: () => createButton3D(props),
       position: props.position,
       rotation: props.rotation,
     };
   }
   ```

3. **Use in page** (`page.tsx`)
   ```typescript
   const buttonProps: Button3DProps = {
     /* ... */
   };
   const components = [
     // ... other components
     createButtonComponent(buttonProps),
   ];
   ```

This modular architecture makes the library highly extensible and maintainable.
