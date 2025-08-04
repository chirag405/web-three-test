"use client";

import { useEffect, useState } from "react";

export function PWAStatus() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [swRegistered, setSwRegistered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log("PWAStatus component loaded");

    // Check if app is installed
    const checkInstallation = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    };

    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Check service worker registration
    const checkServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        setSwRegistered(!!registration);
        console.log("Service worker registered:", !!registration);
      }
    };

    checkInstallation();
    updateOnlineStatus();
    checkServiceWorker();

    // Event listeners
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      window.removeEventListener("appinstalled", () => setIsInstalled(true));
    };
  }, []);

  // Only render on client to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
        🔧 PWA Status Active
      </div>
      {isInstalled && (
        <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
          ✅ Installed
        </div>
      )}
      {!isOnline && (
        <div className="bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm">
          📱 Offline Mode
        </div>
      )}
      {swRegistered && (
        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
          🔧 Service Worker Active
        </div>
      )}
    </div>
  );
}
