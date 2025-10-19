'use client';

import { useState, useEffect } from 'react';
import { supabase, Photo } from '@/lib/supabase';

interface PhotoGalleryProps {
  refreshTrigger: number;
}

export default function PhotoGallery({ refreshTrigger }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching photos:', error);
        return;
      }

      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (photoId: string, photoUrl: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      console.log('Deleting photo:', { photoId, photoUrl });
      
      // Extract filename from URL for storage deletion
      // Supabase URLs look like: https://project.supabase.co/storage/v1/object/public/photos/filename
      const urlParts = photoUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      
      console.log('Extracted filename:', filename);

      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([filename]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
        // Continue with database deletion even if storage fails
      } else {
        console.log('Storage deletion successful');
      }

      // Delete from database
      const { error: dbError, data: deleteData } = await supabase
        .from('photos')
        .delete()
        .eq('id', photoId)
        .select();

      if (dbError) {
        console.error('Database deletion error:', dbError);
        alert('Failed to delete photo from database: ' + dbError.message);
        return;
      }

      console.log('Database deletion successful:', deleteData);
      
      // Remove from local state immediately for better UX
      setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== photoId));
      
      // Also refresh the gallery to ensure consistency
      fetchPhotos();
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the photo: ' + error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8E4585]"></div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No photos uploaded yet. Be the first to share a memory!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group"
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={photo.url}
                alt={photo.filename}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  console.error('Image load error:', photo.url);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Hover overlay with view and delete buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                {/* View button */}
                <button
                  onClick={() => setSelectedPhoto(photo)}
                  className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                  title="View full size"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePhoto(photo.id, photo.url);
                  }}
                  className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
                  title="Delete photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full-size photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.filename}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
              <p className="text-sm">Uploaded by: {selectedPhoto.uploaded_by}</p>
              <p className="text-xs text-gray-300">
                {new Date(selectedPhoto.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
