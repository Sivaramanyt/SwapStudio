// src/components/ResultDisplay.js
import { useState } from 'react';
import { Download, Share2, Heart, RotateCcw, Star, CheckCircle } from 'lucide-react';

export default function ResultDisplay({ result, type }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(result.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `faceswap-result-${Date.now()}.${type === 'video' ? 'mp4' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = window.location.href;
    const shareText = "Check out this amazing face swap result!";
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleNewSwap = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {type === 'video' ? 'Video Face Swap Complete!' : 'Face Swap Complete!'}
        </h3>
        <p className="text-gray-600">
          Your {type === 'video' ? 'video' : 'image'} has been processed successfully
        </p>
      </div>

      {/* Result Display */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Result Media */}
        <div className="p-6">
          <div className="relative bg-gray-100 rounded-xl overflow-hidden">
            {type === 'video' ? (
              <video 
                src={result.url} 
                controls 
                className="w-full max-h-96 object-contain mx-auto"
                poster={result.thumbnail}
              >
                Your browser does not support video playback.
              </video>
            ) : (
              <img 
                src={result.url} 
                alt="Face swap result" 
                className="w-full max-h-96 object-contain mx-auto"
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all"
            >
              <Download className="h-5 w-5 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute top-full mt-2 left-0 bg-white border rounded-lg shadow-lg p-2 z-10 min-w-[150px]">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare('telegram')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                  >
                    Telegram
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                  >
                    Facebook
                  </button>
                </div>
              )}
            </div>

            {/* Like Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                isLiked 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </button>

            {/* New Swap Button */}
            <button
              onClick={handleNewSwap}
              className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-all"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              New Swap
            </button>
          </div>
        </div>

        {/* Quality Info */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-gray-600">HD Quality</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-gray-600">AI Processed</span>
            </div>
            <div className="flex items-center">
              <Download className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-gray-600">No Watermark</span>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Info */}
      <div className="mt-8 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            </div>
            <div className="ml-3 text-left">
              <h3 className="text-sm font-medium text-blue-800">Processing Complete</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Your {type === 'video' ? 'video' : 'image'} was processed using advanced AI technology. 
                  The result will be automatically deleted after 24 hours for your privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
