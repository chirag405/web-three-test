"use client";

import { useEffect, useState } from "react";

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log("PWAInstall component loaded");

    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }

    // Handle install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt event fired");
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    // Handle successful installation
    window.addEventListener("appinstalled", () => {
      console.log("PWA was installed");
      setShowInstallButton(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstallClick = async () => {
    console.log("Install button clicked");
    if (!deferredPrompt) {
      console.log("No deferred prompt available");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // Only render on client to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-500 p-2">
      <button
        onClick={handleInstallClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
      >
        {deferredPrompt ? "Install App" : "Test Install"}
      </button>
    </div>
  );
}
