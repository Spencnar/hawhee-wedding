'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface PhotoUploadProps {
  onUploadSuccess: () => void;
}

export default function PhotoUpload({ onUploadSuccess }: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file.`);
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 10MB.`);
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('photos')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          alert(`Failed to upload ${file.name}: ${uploadError.message}`);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('photos')
          .getPublicUrl(fileName);

        // Save to database
        const { error: dbError } = await supabase
          .from('photos')
          .insert({
            url: urlData.publicUrl,
            filename: file.name,
            uploaded_by: 'Anonymous'
          });

        if (dbError) {
          console.error('Database error:', dbError);
          alert(`Failed to save ${file.name} to database: ${dbError.message}`);
        }
      }
      
      onUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading files.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-[#8E4585] bg-[#8E4585]/10'
            : 'border-gray-300 hover:border-[#8E4585]'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-[#8E4585]">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isUploading ? 'Uploading photos...' : 'Upload your photos'}
            </p>
            <p className="text-sm text-gray-600">
              Drag and drop images here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#8E4585] hover:text-[#8E4585]/80 font-medium"
                disabled={isUploading}
              >
                browse files
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Maximum file size: 10MB. Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
