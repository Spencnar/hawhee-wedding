'use client';

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default function OurStoryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/pic1.jpg',
    '/images/pic2.jpg',
    '/images/pic3.jpg',
    '/images/pic4.jpg',
    '/images/pic5.jpg',
    '/images/pic6.jpg',
    '/images/pic7.jpg',
    '/images/pic8.jpg',
    '/images/pic9.jpg',
    '/images/pic10.jpg',
  ];

  // Auto-advance slideshow (disabled)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => 
  //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 4000); // Change image every 4 seconds

  //   return () => clearInterval(interval);
  // }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-[url('/images/headerbackground.jpg')] bg-cover bg-center">
      <Navbar />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[40vh] py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="bg-gray-300/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-12 border-2 border-[#8E4585] shadow-xl">
            <div className="w-full flex flex-col items-center justify-center">
              {/* Top SVG Border */}
              <div className="w-full flex justify-center">
                <svg className="w-full max-w-[400px] h-10" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 30 Q 50 10, 100 30 T 200 30 T 300 30 T 390 30" stroke="#800020" strokeWidth="2" fill="none"/>
                  <circle cx="50" cy="20" r="6" fill="#b06ea5"/>
                  <circle cx="350" cy="20" r="6" fill="#b06ea5"/>
                  <ellipse cx="200" cy="15" rx="12" ry="8" fill="#c593bc"/>
                </svg>
              </div>
              <div className="text-center py-6 md:py-8 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-burgundy mb-4 tracking-wide">
                  Our Story
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-plum-900 font-semibold">How It All Began</p>
              </div>
              {/* Bottom SVG Border */}
              <div className="w-full flex justify-center">
                <svg className="w-full max-w-[400px] h-10" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10 Q 50 30, 100 10 T 200 10 T 300 10 T 390 10" stroke="#800020" strokeWidth="2" fill="none"/>
                  <circle cx="100" cy="20" r="6" fill="#b06ea5"/>
                  <circle cx="300" cy="20" r="6" fill="#b06ea5"/>
                  <ellipse cx="200" cy="25" rx="12" ry="8" fill="#c593bc"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slideshow Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-300/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#8E4585] shadow-xl">
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Our story image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain object-center transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Navigation */}
              <div className="flex justify-center mt-6 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? 'bg-burgundy'
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-300/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-[#8E4585] shadow-xl">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-gray-900 leading-relaxed">
                
                {/* First Paragraph */}
                <div className="text-center mb-12">
                  <div className="inline-block">
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10 Q 20 5, 30 10 T 50 10" stroke="#800020" strokeWidth="2" fill="none"/>
                      <circle cx="15" cy="10" r="3" fill="#b06ea5"/>
                      <circle cx="45" cy="10" r="3" fill="#b06ea5"/>
                    </svg>
                  </div>
                </div>

                <p className="text-lg md:text-xl leading-relaxed text-center font-medium">
                  It all started back in 2010 at The Spot on a Friday night. I was 12, he was 13, and thanks to some mutual friends, our paths crossed. We both thought the other was cute right away. I thought he was a little nerdy — but in the best way — unique, handsome, and different from everyone else. He said he thought I was beautiful and loved my lively personality.
                </p>

                {/* Second Paragraph */}
                <div className="text-center my-8">
                  <div className="inline-block">
                    <svg width="40" height="15" viewBox="0 0 40 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="7.5" r="2" fill="#c593bc"/>
                    </svg>
                  </div>
                </div>

                <p className="text-lg md:text-xl leading-relaxed">
                  We spent those early years hanging out at Bayhead Skatepark and Largo Park, bonding over our love for music. We went to the same concerts, lived for Warped Tour, and kept finding ways to stay connected. Over the years we dated a few times, and even when life pulled us in different directions, we always seemed to circle back to each other.
                </p>

                {/* Third Paragraph */}
                <div className="text-center my-8">
                  <div className="inline-block">
                    <svg width="40" height="15" viewBox="0 0 40 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="7.5" r="2" fill="#c593bc"/>
                    </svg>
                  </div>
                </div>

                <p className="text-lg md:text-xl leading-relaxed">
                  In 2019, when I was 21 and he was 22, we found our way back together for good. We started dating just before the pandemic, moved in together at the very beginning of it, and have been building a life filled with love, laughter, and plenty of concerts ever since.
                </p>

                {/* Fourth Paragraph */}
                <div className="text-center my-8">
                  <div className="inline-block">
                    <svg width="40" height="15" viewBox="0 0 40 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="7.5" r="2" fill="#c593bc"/>
                    </svg>
                  </div>
                </div>

                <p className="text-lg md:text-xl leading-relaxed">
                  Then, on Friday the 13th in September, everything changed. After dinner and a cozy night in listening to our favorite songs, he got on one knee. Some happy tears were shed, and the rest is history!
                </p>

                {/* Final Paragraph */}
                <div className="text-center mt-12">
                  <div className="inline-block mb-6">
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10 Q 20 15, 30 10 T 50 10" stroke="#800020" strokeWidth="2" fill="none"/>
                      <circle cx="15" cy="10" r="3" fill="#b06ea5"/>
                      <circle cx="45" cy="10" r="3" fill="#b06ea5"/>
                    </svg>
                  </div>
                  
                  <p className="text-xl md:text-2xl font-serif text-burgundy font-semibold leading-relaxed">
                    Now we're so excited to begin this next chapter and can't wait to celebrate our wedding day with all of you!
                  </p>
                </div>

                {/* Bottom Decoration */}
                <div className="text-center mt-12">
                  <div className="inline-block">
                    <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 15 Q 25 5, 40 15 T 70 15" stroke="#800020" strokeWidth="2" fill="none"/>
                      <circle cx="20" cy="15" r="4" fill="#b06ea5"/>
                      <circle cx="60" cy="15" r="4" fill="#b06ea5"/>
                      <ellipse cx="40" cy="12" rx="8" ry="5" fill="#c593bc"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}