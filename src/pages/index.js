import { useState } from 'react';
import Head from 'next/head';
import { Upload, Zap, Download, Star, Shield, Clock } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import VideoUploader from '../components/VideoUploader';
import ResultDisplay from '../components/ResultDisplay';
import AdBanner from '../components/AdBanner';

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

      {/* Header - COLORFUL VERSION */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Zap className="h-8 w-8 text-yellow-300" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                FaceSwap Pro
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-yellow-200 font-semibold transition-colors">✨ Features</a>
              <a href="#gallery" className="hover:text-yellow-200 font-semibold transition-colors">🖼️ Gallery</a>
              <a href="#pricing" className="hover:text-yellow-200 font-semibold transition-colors">💰 Pricing</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - COLORFUL VERSION */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-20 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full animate-bounce delay-300"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Professional AI Face & Video Swap
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Transform faces in photos and videos with cutting-edge AI technology. 
            High-quality results, secure processing, and completely free to use.
          </p>
          
          {/* Colorful Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-3 rounded-full shadow-lg flex items-center text-white font-semibold">
              <Shield className="h-5 w-5 mr-2" />
              <span>Secure & Private</span>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 px-6 py-3 rounded-full shadow-lg flex items-center text-white font-semibold">
              <Clock className="h-5 w-5 mr-2" />
              <span>Fast Processing</span>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full shadow-lg flex items-center text-white font-semibold">
              <Star className="h-5 w-5 mr-2" />
              <span>HD Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 AD PLACEMENT 1: Top Banner */}
      <AdBanner slot="top-banner" />

      {/* Main Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tab Selector - COLORFUL VERSION */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-xl shadow-lg">
              <button
                onClick={() => setActiveTab('face')}
                className={`px-8 py-4 rounded-lg font-bold transition-all ${
                  activeTab === 'face' 
                    ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                ✨ Face Swap
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-8 py-4 rounded-lg font-bold transition-all ${
                  activeTab === 'video' 
                    ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                🎬 Video Swap
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

          {/* 🎯 AD PLACEMENT 2: Middle Banner */}
          <AdBanner slot="middle-banner" />

          {/* Results */}
          {result && (
            <ResultDisplay result={result} type={activeTab} />
          )}
        </div>
      </section>

      {/* 🎯 AD PLACEMENT 3: Pre-Features Banner */}
      <AdBanner slot="pre-features" />

      {/* Features Section - COLORFUL VERSION */}
      <section id="features" className="bg-gradient-to-r from-cyan-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Why Choose FaceSwap Pro?
          </h3>
          <p className="text-gray-600 text-center mb-12">Experience the power of professional AI technology</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105 border-2 border-purple-200">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-purple-800">Lightning Fast</h4>
              <p className="text-gray-700">Advanced AI processing delivers results in seconds, not minutes.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105 border-2 border-green-200">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-green-800">100% Secure</h4>
              <p className="text-gray-700">Your images are processed securely and deleted after 24 hours.</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105 border-2 border-yellow-200">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-orange-800">Professional Quality</h4>
              <p className="text-gray-700">Industry-leading AI models ensure natural, high-quality results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 AD PLACEMENT 4: Bottom Banner */}
      <AdBanner slot="bottom-banner" />

      {/* Footer - COLORFUL VERSION */}
      <footer className="bg-gradient-to-r from-purple-700 via-pink-700 to-red-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6" />
            <span className="text-xl font-bold">FaceSwap Pro</span>
          </div>
          <p className="text-pink-200 mb-4">
            Professional AI face and video swapping technology
          </p>
          <div className="flex justify-center space-x-6 text-sm text-pink-200">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
