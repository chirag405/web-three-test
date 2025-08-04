import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

import { Card2DProps, createCard2D } from "../components/Card2D";
import {
  WireframeRoomProps,
  createWireframeRoom,
} from "../components/WireframeRoom";

// Generic interface for any 3D component
export interface XRComponent {
  id: string;
  create: () => THREE.Object3D;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

// Helper functions to create XRComponent instances
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

interface XRSceneProps {
  components?: XRComponent[];
  enableVR?: boolean;
  backgroundColor?: string;
}

declare global {
  interface Window {
    camera: THREE.Camera;
  }
}

export function XRScene({
  components = [],
  enableVR = true,
  backgroundColor = "#000000",
}: XRSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [showVRButton, setShowVRButton] = useState(enableVR);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.6, 0);
    cameraRef.current = camera;
    window.camera = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: backgroundColor === "transparent",
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Enable XR in renderer if VR is enabled
    if (enableVR) {
      renderer.xr.enabled = true;
    }

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.HemisphereLight(0x606060, 0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add additional lighting for better visibility
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Check for WebXR support and configure WebXRManager
    if (enableVR && "xr" in navigator) {
      // Set reference space type
      renderer.xr.setReferenceSpaceType("local");

      navigator.xr
        ?.isSessionSupported("immersive-vr")
        .then((supported) => {
          setIsVRSupported(supported);
          setShowVRButton(true); // Always show button when VR is enabled
        })
        .catch(() => {
          setIsVRSupported(false);
          setShowVRButton(true); // Still show button for debugging
        });
    } else if (enableVR) {
      setIsVRSupported(false);
      setShowVRButton(true); // Always show button when VR is enabled
    } else {
      setShowVRButton(false); // Only hide when VR is explicitly disabled
    }

    // Add all components to scene
    components.forEach((component) => {
      const object = component.create();

      // Apply transformations
      if (component.position) {
        object.position.set(...component.position);
      }
      if (component.rotation) {
        object.rotation.set(...component.rotation);
      }
      if (component.scale) {
        object.scale.set(...component.scale);
      }

      scene.add(object);
    });

    // Animation loop
    function render() {
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);

    // Handle window resize
    function handleResize() {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [components, enableVR, backgroundColor]);

  async function handleEnterVR() {
    if (!rendererRef.current || !isVRSupported) {
      console.log("VR not supported or renderer not ready");
      return;
    }

    try {
      // Request VR session using Three.js WebXRManager
      const session = await navigator.xr?.requestSession("immersive-vr");

      if (session) {
        // Set the session on Three.js WebXRManager
        await rendererRef.current.xr.setSession(session);
        console.log("VR session started successfully");
        console.log(
          "Reference space:",
          rendererRef.current.xr.getReferenceSpace()
        );
        console.log("Is presenting:", rendererRef.current.xr.isPresenting);
      }
    } catch (error) {
      console.error("Failed to start VR session:", error);
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div ref={mountRef} className="w-full h-full" />

      {/* VR Button */}
      {enableVR && (
        <button
          onClick={handleEnterVR}
          disabled={!isVRSupported}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 24px",
            backgroundColor: isVRSupported ? "#2563eb" : "#dc2626",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: isVRSupported ? "pointer" : "not-allowed",
            zIndex: 9999,
            opacity: isVRSupported ? 1 : 0.8,
            transition: "all 0.2s ease",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "block",
            visibility: "visible",
          }}
        >
          🥽 {isVRSupported ? "Enter VR" : "VR Not Available"}
        </button>
      )}
    </div>
  );
}
