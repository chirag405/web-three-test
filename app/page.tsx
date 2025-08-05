"use client";

import { useMemo } from "react";
import { Card2DProps } from "@/components/Card2D";
import { WireframeRoomProps } from "@/components/WireframeRoom";
import {
  XRScene,
  createCardComponent,
  createWireframeRoomComponent,
} from "../scenes/XRScene";

export default function Home() {
  const cardProps: Card2DProps = {
    position: [0, 1.6, -3],
    width: 2,
    height: 1.5,
    color: "#87CEEB",
    text: "2DD Card",
  };

  const wireframeRoomProps: WireframeRoomProps = {
    width: 12,
    height: 8,
    depth: 12,
    color: "#00FF00",
    lineWidth: 1,
  };

  const components = useMemo(
    () => [
      createCardComponent(cardProps),
      createWireframeRoomComponent(wireframeRoomProps),
    ],
    []
  );

  return (
    <main className="w-screen h-screen m-0 p-0 overflow-hidden bg-gray-900">
      <XRScene
        components={components}
        enableVR={true}
        backgroundColor="#1f2937"
      />
    </main>
  );
}
