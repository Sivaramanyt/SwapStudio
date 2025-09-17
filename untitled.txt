import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Video, Image, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VideoUploader({ setProcessing, setResult, processing }) {
  const [sourceImage, setSourceImage] = useState(null);
  const [targetVideo, setTargetVideo] = useState(null);

  const onDropSource = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSourceImage({ file, preview: reader.result });
      reader.readAsDataURL(file);
    }
  }, []);

  const onDropTarget = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setTargetVideo({ file, name: file.name });
    }
  }, []);

  const { getRootProps: getSourceProps, getInputProps: getSourceInputProps } = useDropzone({
    onDrop: onDropSource,
    accept: { 'image/*': [] },
    multiple: false
  });

  const { getRootProps: getTargetProps, getInputProps: getTargetInputProps } = useDropzone({
    onDrop: onDropTarget,
    accept: { 'video/*': [] },
    multiple: false,
    maxSize: 100 * 1024 * 1024 // 100MB limit
  });

  const handleSwap = async () => {
    if (!sourceImage || !targetVideo) {
      toast.error('Please upload both face image and target video');
      return;
    }

    setProcessing(true);
    toast.loading('Processing video face swap... This may take a few minutes.');

    try {
      const formData = new FormData();
      formData.append('source', sourceImage.file);
      formData.append('target', targetVideo.file);

      const response = await fetch('/api/videoswap', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.result);
        toast.dismiss();
        toast.success('Video face swap completed!');
        
        // Store user's content
        await storeUserContent({
          type: 'video',
          sourceUrl: data.result.sourceStored,
          targetUrl: data.result.targetStored,
          resultUrl: data.result.url,
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Video face swap failed. Please try again.');
      console.error('Video swap error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Areas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Source Face */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-center">Source Face</h4>
          <div
            {...getSourceProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
          >
            <input {...getSourceInputProps()} />
            {sourceImage ? (
              <img 
                src={sourceImage.preview} 
                alt="Source" 
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="space-y-4">
                <Image className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium">Upload face image</p>
                  <p className="text-gray-500">The face to swap into video</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Target Video */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-center">Target Video</h4>
          <div
            {...getTargetProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
          >
            <input {...getTargetInputProps()} />
            {targetVideo ? (
              <div className="space-y-4">
                <Video className="h-12 w-12 text-green-500 mx-auto" />
                <div>
                  <p className="text-lg font-medium">Video uploaded</p>
                  <p className="text-gray-500">{targetVideo.name}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Video className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium">Upload video file</p>
                  <p className="text-gray-500">Max 100MB, MP4/MOV format</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Processing Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Video className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Video Processing</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Video face swap takes longer to process. Expected time: 2-5 minutes for short videos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="text-center">
        <button
          onClick={handleSwap}
          disabled={processing || !sourceImage || !targetVideo}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
        >
          {processing ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Processing Video...
            </>
          ) : (
            'Swap Face in Video'
          )}
        </button>
      </div>
    </div>
  );
}

async function storeUserContent(data) {
  try {
    await fetch('/api/store-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to store content:', error);
  }
}
