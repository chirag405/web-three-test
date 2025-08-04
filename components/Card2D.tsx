import * as THREE from "three";

export interface Card2DProps {
  width?: number;
  height?: number;
  color?: string;
  text?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function createCard2D(props: Card2DProps): THREE.Group {
  const { width = 1, height = 0.6, color = "#ffffff", text = "Card" } = props;

  const group = new THREE.Group();

  // Base plane
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  // Border
  const borderGeometry = new THREE.EdgesGeometry(geometry);
  const borderMaterial = new THREE.LineBasicMaterial({
    color: "#000000",
    linewidth: 2,
  });
  const border = new THREE.LineSegments(borderGeometry, borderMaterial);
  group.add(border);

  // Text
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    canvas.width = 512;
    canvas.height = 256;

    context.fillStyle = "#ffffff";
    context.font = "bold 48px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const textGeometry = new THREE.PlaneGeometry(width * 0.8, height * 0.4);
    const textMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 0.01; // Slight offset in front
    group.add(textMesh);
  }

  return group;
}
