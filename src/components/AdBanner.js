import { useEffect } from 'react';

export default function AdBanner({ slot, type = "banner" }) {
  useEffect(() => {
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
      <div className="min-h-[250px] bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
        <div className="text-purple-500 font-semibold">Ad Space {slot}</div>
      </div>
    </div>
  );
}
