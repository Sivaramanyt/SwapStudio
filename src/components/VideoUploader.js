"use client"
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
    maxSize: 100 * 1024 * 1024
  });

  const handleSwap = async () => {
    if (!sourceImage || !targetVideo) {
      toast.error('Please upload both face image and target video');
      return;
    }

    setProcessing(true);
    toast.loading('Processing video face swap... This may take a few minutes.');

    try {
      // Simulate API call for demo
      setTimeout(() => {
        setResult({
          url: '/demo-video-result.mp4',
          sourceStored: sourceImage.preview,
          targetStored: targetVideo.name,
          id: Date.now().toString()
        });
        toast.dismiss();
        toast.success('Video face swap completed!');
        setProcessing(false);
      }, 5000);
    } catch (error) {
      toast.dismiss();
      toast.error('Video face swap failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-center text-purple-800">✨ Source Face</h4>
          <div
            {...getSourceProps()}
            className="border-4 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center hover:border-purple-500 hover:from-purple-100 hover:to-pink-100 transition-all cursor-pointer upload-area shadow-lg"
          >
            <input {...getSourceInputProps()} />
            {sourceImage ? (
              <img 
                src={sourceImage.preview} 
                alt="Source" 
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="space-y-4">
                <Image className="h-12 w-12 text-purple-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-purple-700">Upload face image</p>
                  <p className="text-purple-500">The face to swap into video</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-center text-purple-800">🎬 Target Video</h4>
          <div
            {...getTargetProps()}
            className="border-4 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center hover:border-purple-500 hover:from-purple-100 hover:to-pink-100 transition-all cursor-pointer upload-area shadow-lg"
          >
            <input {...getTargetInputProps()} />
            {targetVideo ? (
              <div className="space-y-4">
                <Video className="h-12 w-12 text-green-500 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-green-700">✅ Video uploaded</p>
                  <p className="text-green-600">{targetVideo.name}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Video className="h-12 w-12 text-purple-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-purple-700">Upload video file</p>
                  <p className="text-purple-500">Max 100MB, MP4/MOV format</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSwap}
          disabled={processing || !sourceImage || !targetVideo}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto transform hover:scale-105 transition-all shadow-lg"
        >
          {processing ? (
            <>
              <Loader className="h-6 w-6 mr-3 animate-spin" />
              Processing Video Magic...
            </>
          ) : (
            <>
              <Video className="h-6 w-6 mr-3" />
              🎬 Swap Face in Video
            </>
          )}
        </button>
      </div>
    </div>
  );
}
