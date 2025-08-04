const fs = require("fs");
const path = require("path");

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, "../public/icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateIcon(size) {
  const canvas = require("canvas").createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, size, size);

  // Draw a simple 3D cube icon
  const padding = size * 0.2;
  const cubeSize = size - padding * 2;

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = size * 0.05;

  // Front face
  ctx.strokeRect(padding, padding, cubeSize, cubeSize);

  // Back face (offset)
  const offset = cubeSize * 0.3;
  ctx.strokeRect(padding + offset, padding + offset, cubeSize, cubeSize);

  // Connecting lines
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding + offset, padding + offset);
  ctx.moveTo(padding + cubeSize, padding);
  ctx.lineTo(padding + offset + cubeSize, padding + offset);
  ctx.moveTo(padding, padding + cubeSize);
  ctx.lineTo(padding + offset, padding + offset + cubeSize);
  ctx.moveTo(padding + cubeSize, padding + cubeSize);
  ctx.lineTo(padding + offset + cubeSize, padding + offset + cubeSize);
  ctx.stroke();

  return canvas.toBuffer("image/png");
}

// Generate all icons
sizes.forEach((size) => {
  const iconBuffer = generateIcon(size);
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);

  fs.writeFileSync(filepath, iconBuffer);
  console.log(`Generated ${filename}`);
});

console.log("All icons generated successfully!");
