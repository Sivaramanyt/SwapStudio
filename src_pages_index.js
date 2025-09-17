import { useState } from 'react';
import Head from 'next/head';
import { Upload, Zap, Download, Star, Shield, Clock } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import VideoUploader from '../components/VideoUploader';
import ResultDisplay from '../components/ResultDisplay';

export default function Home() {
  const [activeTab, setActiveTab] = useState('face');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  return (
    <>
      <Head>
        <title>FaceSwap Pro - AI Face & Video Swap | Free Online Tool</title>
        <meta name="description" content="Professional AI face swap and video swap tool. High-quality results, secure processing, and free to use." />
        <meta name="keywords" content="face swap, video swap, AI face swap, deepfake, face change" />
      </Head>

      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8" />
              <h1 className="text-2xl font-bold">FaceSwap Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="hover:text-purple-200">Features</a>
              <a href="#gallery" className="hover:text-purple-200">Gallery</a>
              <a href="#pricing" className="hover:text-purple-200">Pricing</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Professional AI Face & Video Swap
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform faces in photos and videos with cutting-edge AI technology. 
            High-quality results, secure processing, and completely free to use.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <Shield className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <Clock className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium">Fast Processing</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">HD Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('face')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'face' 
                    ? 'bg-white text-purple-600 shadow-md' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Face Swap
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'video' 
                    ? 'bg-white text-purple-600 shadow-md' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Video Swap
              </button>
            </div>
          </div>

          {/* Upload Areas */}
          <div className="max-w-6xl mx-auto">
            {activeTab === 'face' ? (
              <ImageUploader 
                setProcessing={setProcessing}
                setResult={setResult}
                processing={processing}
              />
            ) : (
              <VideoUploader 
                setProcessing={setProcessing}
                setResult={setResult}
                processing={processing}
              />
            )}
          </div>

          {/* Results */}
          {result && (
            <ResultDisplay result={result} type={activeTab} />
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose FaceSwap Pro?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-purple-600" />}
              title="Lightning Fast"
              description="Advanced AI processing delivers results in seconds, not minutes."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-green-600" />}
              title="100% Secure"
              description="Your images are processed securely and deleted after 24 hours."
            />
            <FeatureCard 
              icon={<Star className="h-8 w-8 text-yellow-600" />}
              title="Professional Quality"
              description="Industry-leading AI models ensure natural, high-quality results."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6" />
            <span className="text-xl font-bold">FaceSwap Pro</span>
          </div>
          <p className="text-gray-400 mb-4">
            Professional AI face and video swapping technology
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
