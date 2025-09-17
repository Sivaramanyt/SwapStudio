// src/components/AdBanner.js
import { useEffect } from 'react';

export default function AdBanner({ slot, type = "banner" }) {
  useEffect(() => {
    // Load Adsterra script if not already loaded
    if (!document.querySelector('script[src*="adsterra"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://yourcode.adsterra.com/js/your-adsterra-code.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="text-center my-8">
      <div className="text-xs text-gray-400 mb-2">Advertisement</div>
      {/* Replace with your actual Adsterra ad code */}
      <div id={`adsterra-${slot}`} className="min-h-[250px] bg-gray-50 rounded-lg flex items-center justify-center">
        {/* Your Adsterra ad code will replace this placeholder */}
        <div className="text-gray-400">Ad Space {slot}</div>
      </div>
    </div>
  );
}
