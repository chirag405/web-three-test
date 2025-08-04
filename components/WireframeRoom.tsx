import * as THREE from "three";

export interface WireframeRoomProps {
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  lineWidth?: number;
  gridSpacing?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  showFloor?: boolean;
  showCeiling?: boolean;
  showWalls?: boolean;
}

export function createWireframeRoom(props: WireframeRoomProps): THREE.Group {
  const {
    width = 10,
    height = 8,
    depth = 10,
    color = "#ffffff",
    lineWidth = 2,
    gridSpacing = 1,
    showFloor = true,
    showCeiling = true,
    showWalls = true,
  } = props;

  const group = new THREE.Group();

  // Create wireframe material with better visibility for VR
  const material = new THREE.LineBasicMaterial({
    color,
    linewidth: lineWidth,
    transparent: true,
    opacity: 0.7,
  });

  // More efficient grid creation function
  function createGrid(
    width: number,
    height: number,
    widthSegments: number,
    heightSegments: number,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    posX = 0,
    posY = 0,
    posZ = 0
  ): THREE.LineSegments {
    const geometry = new THREE.PlaneGeometry(
      width,
      height,
      widthSegments,
      heightSegments
    );
    const wireframe = new THREE.WireframeGeometry(geometry);
    const grid = new THREE.LineSegments(wireframe, material);

    grid.rotation.set(rotateX, rotateY, rotateZ);
    grid.position.set(posX, posY, posZ);

    return grid;
  }

  // Alternative: Manual grid creation for more control
  function createManualGrid(
    startX: number,
    endX: number,
    startY: number,
    endY: number,
    z: number,
    spacing: number,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0
  ): THREE.LineSegments {
    const vertices: number[] = [];
    const indices: number[] = [];
    let index = 0;

    // Horizontal lines
    for (let y = startY; y <= endY; y += spacing) {
      vertices.push(startX, y, z, endX, y, z);
      indices.push(index, index + 1);
      index += 2;
    }

    // Vertical lines
    for (let x = startX; x <= endX; x += spacing) {
      vertices.push(x, startY, z, x, endY, z);
      indices.push(index, index + 1);
      index += 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);

    const grid = new THREE.LineSegments(geometry, material);
    grid.rotation.set(rotateX, rotateY, rotateZ);

    return grid;
  }

  const segments = Math.floor(Math.max(width, height, depth) / gridSpacing);

  // Floor grid
  if (showFloor) {
    const floorGrid = createGrid(
      width,
      depth,
      Math.floor(width / gridSpacing),
      Math.floor(depth / gridSpacing),
      -Math.PI / 2,
      0,
      0,
      0,
      0,
      0
    );
    group.add(floorGrid);
  }

  // Ceiling grid
  if (showCeiling) {
    const ceilingGrid = createGrid(
      width,
      depth,
      Math.floor(width / gridSpacing),
      Math.floor(depth / gridSpacing),
      Math.PI / 2,
      0,
      0,
      0,
      height,
      0
    );
    group.add(ceilingGrid);
  }

  if (showWalls) {
    // Front wall (facing negative Z)
    const frontWall = createGrid(
      width,
      height,
      Math.floor(width / gridSpacing),
      Math.floor(height / gridSpacing),
      0,
      0,
      0,
      0,
      height / 2,
      -depth / 2
    );
    group.add(frontWall);

    // Back wall (facing positive Z)
    const backWall = createGrid(
      width,
      height,
      Math.floor(width / gridSpacing),
      Math.floor(height / gridSpacing),
      0,
      Math.PI,
      0,
      0,
      height / 2,
      depth / 2
    );
    group.add(backWall);

    // Left wall (facing negative X)
    const leftWall = createGrid(
      depth,
      height,
      Math.floor(depth / gridSpacing),
      Math.floor(height / gridSpacing),
      0,
      Math.PI / 2,
      0,
      -width / 2,
      height / 2,
      0
    );
    group.add(leftWall);

    // Right wall (facing positive X)
    const rightWall = createGrid(
      depth,
      height,
      Math.floor(depth / gridSpacing),
      Math.floor(height / gridSpacing),
      0,
      -Math.PI / 2,
      0,
      width / 2,
      height / 2,
      0
    );
    group.add(rightWall);
  }

  // Note: Position and rotation are now handled by XRScene
  // group.position.set(...position);
  // group.rotation.set(...rotation);

  return group;
}

// Alternative approach using EdgesGeometry for cleaner wireframes
export function createWireframeRoomEdges(
  props: WireframeRoomProps
): THREE.Group {
  const {
    width = 10,
    height = 8,
    depth = 10,
    color = "#ffffff",
    lineWidth = 2,
  } = props;

  const group = new THREE.Group();

  const material = new THREE.LineBasicMaterial({
    color,
    linewidth: lineWidth,
    transparent: true,
    opacity: 0.8,
  });

  // Create room as a box and extract edges
  const roomGeometry = new THREE.BoxGeometry(width, height, depth);
  const edges = new THREE.EdgesGeometry(roomGeometry);
  const wireframe = new THREE.LineSegments(edges, material);

  wireframe.position.set(0, height / 2, 0);
  group.add(wireframe);

  // Add internal grid lines for more detail
  const gridMaterial = new THREE.LineBasicMaterial({
    color,
    linewidth: 1,
    transparent: true,
    opacity: 0.3,
  });

  // Internal grid helper
  const gridHelper = new THREE.GridHelper(
    Math.max(width, depth),
    10,
    color,
    color
  );
  gridHelper.material.opacity = 0.3;
  gridHelper.material.transparent = true;
  group.add(gridHelper);

  // Note: Position and rotation are now handled by XRScene
  // group.position.set(...position);
  // group.rotation.set(...rotation);

  return group;
}

// VR-optimized version with better performance
export function createVRWireframeRoom(props: WireframeRoomProps): THREE.Group {
  const {
    width = 10,
    height = 8,
    depth = 10,
    color = "#ffffff",
    gridSpacing = 0.5, // Smaller spacing for VR detail
  } = props;

  const group = new THREE.Group();

  // Use instanced rendering for better VR performance
  const lineMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.6,
  });

  // Create a single line geometry to be instanced
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
  ]);

  // Create all grid lines as individual objects for better culling in VR
  const createGridLines = (
    startPos: THREE.Vector3,
    direction: THREE.Vector3,
    perpDirection: THREE.Vector3,
    count: number,
    length: number,
    spacing: number
  ) => {
    for (let i = 0; i <= count; i++) {
      const line = new THREE.Line(lineGeometry.clone(), lineMaterial.clone());
      const pos = startPos
        .clone()
        .add(perpDirection.clone().multiplyScalar(i * spacing));
      line.position.copy(pos);
      line.scale.set(length, 1, 1);
      line.lookAt(pos.clone().add(direction));
      group.add(line);
    }
  };

  // Floor grid
  createGridLines(
    new THREE.Vector3(-width / 2, 0, -depth / 2),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 1),
    Math.floor(depth / gridSpacing),
    width,
    gridSpacing
  );

  createGridLines(
    new THREE.Vector3(-width / 2, 0, -depth / 2),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 0),
    Math.floor(width / gridSpacing),
    depth,
    gridSpacing
  );

  return group;
}
