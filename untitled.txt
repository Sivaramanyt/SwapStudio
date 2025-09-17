import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Loader } from 'lucide-react';
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
      const formData = new FormData();
      formData.append('source', sourceImage.file);
      formData.append('target', targetImage.file);

      const response = await fetch('/api/faceswap', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.result);
        toast.dismiss();
        toast.success('Face swap completed!');
        
        // Store user's images for analytics (optional)
        await storeUserContent({
          type: 'image',
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
      toast.error('Face swap failed. Please try again.');
      console.error('Face swap error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Areas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Source Image */}
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
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium">Upload source image</p>
                  <p className="text-gray-500">The face you want to use</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Target Image */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-center">Target Image</h4>
          <div
            {...getTargetProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
          >
            <input {...getTargetInputProps()} />
            {targetImage ? (
              <img 
                src={targetImage.preview} 
                alt="Target" 
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="space-y-4">
                <Image className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium">Upload target image</p>
                  <p className="text-gray-500">The image to modify</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="text-center">
        <button
          onClick={handleSwap}
          disabled={processing || !sourceImage || !targetImage}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
        >
          {processing ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Swap Faces'
          )}
        </button>
      </div>
    </div>
  );
}

// Helper function to store user content
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
