import { useState } from 'react';
import { Download } from 'lucide-react';

export default function DownloadButton({ imageUrl, fileName = 'face-swap-result.jpg' }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // iOS devices - open in new tab
        window.open(imageUrl, '_blank');
      } else {
        // Other devices - proper download
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      // Fallback - open in new tab
      window.open(imageUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <Download size={20} />
      {downloading ? 'Downloading...' : 'Download Image'}
    </button>
  );
}
