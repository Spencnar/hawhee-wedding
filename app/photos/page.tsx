'use client';

import Navbar from '@/components/Navbar'
import PhotoUpload from '@/components/PhotoUpload'
import PhotoGallery from '@/components/PhotoGallery'
import { useState } from 'react'

export default function PhotosPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[url('/images/headerbackground.jpg')] bg-cover bg-center">
      <Navbar />
      
      {/* Photos Section */}
      <section id="photos" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-300/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-[#8E4585] shadow-xl">
            <h2 className="text-3xl font-serif text-[#8E4585] text-center mb-8">
              Share Your Photos
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
              Upload your favorite memories from our wedding celebration! Everyone can contribute photos to create a beautiful shared gallery.
            </p>
            
            {/* Upload Section */}
            <div className="mb-12">
              <PhotoUpload onUploadSuccess={handleUploadSuccess} />
            </div>
            
            {/* Gallery Section */}
            <div>
              <h3 className="text-2xl font-serif text-[#8E4585] text-center mb-6">
                Photo Gallery
              </h3>
              <PhotoGallery refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}