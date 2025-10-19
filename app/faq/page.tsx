'use client';

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "What should I know about the venue?",
      answer: "We're so excited to celebrate with you in Clearwater Beach! If you're staying at the Courtyard by Marriott, you'll be just steps from the beach with comfy rooms, a rooftop bar for amazing sunsets, and even a pool to relax by. There's a Starbucks and restaurant right inside, plus a marina if you want to hop on a boat tour. It's the perfect spot to enjoy the wedding weekend!"
    },
    {
      question: "What should I wear?",
      answer: "We're going with a Yacht Cocktail vibe! Think breezy but dressy with a Margaritaville vibe. For men: short-sleeve Hawaiian or tropical shirts with dressy shorts or slacks. For women: flowy, floral and/or colorful, short or midi dresses that are easy to move in and perfect for warm weather. The goal is to look festive and polished while staying cool and comfortable."
    },
    {
      question: "What will the weather be like?",
      answer: "October in Clearwater Beach is warm and sunny, with daytime highs usually in the upper 70s to low 80s and evenings in the 60s–70s. The humidity is lower than in summer, making it one of the best times of year to enjoy the beach. You can expect plenty of sunshine!"
    },
    {
      question: "What are some activities to do in the area?",
      answer: "The Courtyard Clearwater Beach is in the heart of it all! You can stroll to Pier 60 for nightly sunset celebrations, enjoy the sugar-white sand just steps away, or explore the shops and restaurants along the Beach Walk. Dolphin cruises and boat tours leave right from the marina next to the hotel, and if you're up for fresh seafood and live music, the Frenchy's Stone Crab Festival is happening that weekend—just a short walk away. It's the perfect mix of relaxing beach time and local fun!"
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
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
                  FAQ
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-plum-900 font-semibold">Frequently Asked Questions</p>
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

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-300/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-[#8E4585] shadow-xl">
            <div className="space-y-6">
              {faqData.map((item, index) => (
                <div key={index} className="border-b border-plum-200 last:border-b-0 pb-6 last:pb-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left flex justify-between items-center py-4 px-6 bg-white/50 rounded-lg hover:bg-white/70 transition-colors group"
                  >
                    <h3 className="text-lg md:text-xl font-serif text-burgundy font-semibold pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg 
                        className={`w-6 h-6 text-burgundy transition-transform duration-300 ${
                          openItems.includes(index) ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="mt-4 px-6 py-4 bg-white/30 rounded-lg">
                      <p className="text-gray-900 leading-relaxed text-base md:text-lg">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
      </section>
    </div>
  )
}