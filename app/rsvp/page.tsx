'use client';

import React, { useState } from 'react';
import { useActionState } from 'react';
import { submitRSVP, FormState } from '@/app/actions/rsvp';
import Navbar from '@/components/Navbar';

export default function RSVPPage() {
  const [state, formAction] = useActionState(submitRSVP, { success: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[url('/images/headerbackground.jpg')] bg-cover bg-center">
      <Navbar />
      {/* RSVP Section */}
      <section id="rsvp" className="py-20">
        <div className="max-w-2xl mx-auto px-4 bg-gray-300 bg-opacity-50 rounded-lg p-8 border-2 border-[#8E4585]">
          <h2 className="text-3xl font-serif text-burgundy text-center mb-8">
            RSVP
          </h2>
          
          {/* Success/Error Messages */}
          {state.success === true && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {state.message}
            </div>
          )}
          
          {state.success === false && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {state.message}
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            {/* Honeypot field for spam protection */}
            <div className="absolute left-[-9999px]">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="name" className="block text-plum-900 mb-2 font-semibold">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-plum-200 rounded-lg focus:outline-none focus:border-burgundy text-gray-900 bg-white"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-plum-900 mb-2 font-semibold">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-plum-200 rounded-lg focus:outline-none focus:border-burgundy text-gray-900 bg-white"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="attending" className="block text-plum-900 mb-2 font-semibold">
                Will you attend? *
              </label>
              <select
                id="attending"
                name="attending"
                className="w-full px-4 py-2 border border-plum-200 rounded-lg focus:outline-none focus:border-burgundy text-gray-900 bg-white"
                required
                disabled={isSubmitting}
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I will attend</option>
                <option value="no">No, I cannot attend</option>
              </select>
            </div>

           

            

            <div>
              <label htmlFor="message" className="block text-plum-900 mb-2 font-semibold">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="w-full px-4 py-2 border border-plum-200 rounded-lg focus:outline-none focus:border-burgundy text-gray-900 bg-white"
                placeholder="Any additional comments or messages..."
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/2 mx-auto flex justify-center font-semibold py-3 rounded-lg transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-[#612f48] text-white hover:bg-[#4a2337]'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit RSVP'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}