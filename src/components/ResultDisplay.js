import { useState } from 'react';
import { Download, Share2, Heart, RotateCcw, Star, CheckCircle } from 'lucide-react';

export default function ResultDisplay({ result, type }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      alert('Download would start here!');
    }, 2000);
  };

  const handleShare = async (platform) => {
    const shareUrl = window.location.href;
    const shareText = "Check out this amazing face swap result! 🔥";
    
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

  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-3">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎉 {type === 'video' ? 'Video Face Swap Complete!' : 'Face Swap Complete!'}
        </h3>
        <p className="text-gray-600 text-lg">
          Your {type === 'video' ? 'video' : 'image'} has been processed successfully
        </p>
      </div>

      {/* Result Display */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-200">
        {/* Result Media */}
        <div className="p-6">
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
            <div className="w-full h-96 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
              <div className="text-center">
                <Star className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <p className="text-2xl font-bold text-purple-700">
                  🎨 {type === 'video' ? 'Video' : 'Image'} Result Preview
                </p>
                <p className="text-purple-600">Your processed content would appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <Download className="h-5 w-5 mr-2" />
              {isDownloading ? 'Downloading...' : '📥 Download'}
            </button>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                🚀 Share
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute top-full mt-2 left-0 bg-white border-2 border-purple-200 rounded-xl shadow-2xl p-3 z-10 min-w-[150px]">
                  <button onClick={() => handleShare('whatsapp')} className="w-full text-left px-4 py-3 hover:bg-purple-50 rounded-lg text-sm font-semibold">📱 WhatsApp</button>
                  <button onClick={() => handleShare('telegram')} className="w-full text-left px-4 py-3 hover:bg-purple-50 rounded-lg text-sm font-semibold">✈️ Telegram</button>
                  <button onClick={() => handleShare('twitter')} className="w-full text-left px-4 py-3 hover:bg-purple-50 rounded-lg text-sm font-semibold">🐦 Twitter</button>
                  <button onClick={() => handleShare('facebook')} className="w-full text-left px-4 py-3 hover:bg-purple-50 rounded-lg text-sm font-semibold">📘 Facebook</button>
                </div>
              )}
            </div>

            {/* Like Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg ${
                isLiked 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
              }`}
            >
              <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? '❤️ Liked' : '🤍 Like'}
            </button>

            {/* New Swap Button */}
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              🔄 New Swap
            </button>
          </div>
        </div>

        {/* Quality Info */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-purple-700 font-semibold">⭐ HD Quality</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-purple-700 font-semibold">🤖 AI Processed</span>
            </div>
            <div className="flex items-center">
              <Download className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-purple-700 font-semibold">🚫 No Watermark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
