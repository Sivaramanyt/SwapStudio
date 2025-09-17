"use client"
  const handleDownload = () => {
  if (navigator.share && navigator.canShare) {
    // Use native mobile sharing if available
    navigator.share({
      title: 'Face Swap Result',
      text: 'Check out my face swap result!',
      url: result.url
    });
  } else {
    // Fallback to download
    window.open(result.url, '_blank');
  }
};
