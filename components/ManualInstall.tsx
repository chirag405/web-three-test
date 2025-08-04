"use client";

import { useState } from "react";

export function ManualInstall() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
      >
        📱 Install PWA
      </button>

      {showInstructions && (
        <div className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm">
          <h3 className="font-bold text-gray-800 mb-2">How to Install:</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Chrome/Edge:</strong>
            </p>
            <ul className="list-disc list-inside ml-2">
              <li>Look for 📱 icon in address bar</li>
              <li>Or click ⋮ menu → &ldquo;Install app&rdquo;</li>
            </ul>
            <p>
              <strong>Mobile Chrome:</strong>
            </p>
            <ul className="list-disc list-inside ml-2">
              <li>Tap ⋮ menu → &ldquo;Add to Home screen&rdquo;</li>
            </ul>
            <p>
              <strong>Safari (iOS):</strong>
            </p>
            <ul className="list-disc list-inside ml-2">
              <li>Tap share button → &ldquo;Add to Home Screen&rdquo;</li>
            </ul>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
