import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Loader, Zap } from 'lucide-react'; // ← FIXED: Added Zap
import toast from 'react-hot-toast';

export default function ImageUploader({ setProcessing, setResult, processing }) {
  const [sourceImage, setSourceImage] = useState(null);
  const [targetImage, setTargetImage] = useState(null);

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
      const reader = new FileReader();
      reader.onload = () => setTargetImage({ file, preview: reader.result });
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps: getSourceProps, getInputProps: getSourceInputProps } = useDropzone({
    onDrop: onDropSource,
    accept: { 'image/*': [] },
    multiple: false
  });

  const { getRootProps: getTargetProps, getInputProps: getTargetInputProps } = useDropzone({
    onDrop: onDropTarget,
    accept: { 'image/*': [] },
    multiple: false
  });

  const handleSwap = async () => {
    if (!sourceImage || !targetImage) {
      toast.error('Please upload both images');
      return;
    }

    setProcessing(true);
    toast.loading('Processing face swap...');

    try {
      // Simulate API call for demo
      setTimeout(() => {
        setResult({
          url: '/demo-result.jpg',
          sourceStored: sourceImage.preview,
          targetStored: targetImage.preview,
          id: Date.now().toString()
        });
        toast.dismiss();
        toast.success('Face swap completed!');
        setProcessing(false);
      }, 3000);
    } catch (error) {
      toast.dismiss();
      toast.error('Face swap failed. Please try again.');
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
                <Upload className="h-12 w-12 text-purple-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-purple-700">Upload source image</p>
                  <p className="text-purple-500">The face you want to use</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-center text-purple-800">🎯 Target Image</h4>
          <div
            {...getTargetProps()}
            className="border-4 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center hover:border-purple-500 hover:from-purple-100 hover:to-pink-100 transition-all cursor-pointer upload-area shadow-lg"
          >
            <input {...getTargetInputProps()} />
            {targetImage ? (
              <img 
                src={targetImage.preview} 
                alt="Target" 
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="space-y-4">
                <Image className="h-12 w-12 text-purple-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-purple-700">Upload target image</p>
                  <p className="text-purple-500">The image to modify</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSwap}
          disabled={processing || !sourceImage || !targetImage}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto transform hover:scale-105 transition-all shadow-lg"
        >
          {processing ? (
            <>
              <Loader className="h-6 w-6 mr-3 animate-spin" />
              Processing Magic...
            </>
          ) : (
            <>
              <Zap className="h-6 w-6 mr-3" />
              ✨ Swap Faces
            </>
          )}
        </button>
      </div>
    </div>
  );
    }
              
