import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Image as ImageIcon, X } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  city: string | null;
}

interface LocalGalleryProps {
  cityName?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
}

const LocalGallery: React.FC<LocalGalleryProps> = ({
  cityName,
  title = 'Nos Réalisations',
  subtitle = 'Découvrez quelques-unes de nos réalisations de pose et rénovation de parquet',
  limit = 6
}) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, [cityName, limit]);

  const fetchPhotos = async () => {
    try {
      let query = supabase
        .from('gallery_photos')
        .select('id, url, title, description, city')
        .order('order', { ascending: true });

      if (cityName) {
        query = query.or(`city.eq.${cityName},city.is.null`);
      }

      query = query.limit(limit);

      const { data, error } = await query;

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-100"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-w-16 aspect-h-12 relative h-64">
                  <img
                    src={photo.url}
                    alt={photo.title || 'Réalisation parquet'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {photo.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-sm text-gray-200 mt-1 line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                  </div>
                )}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImageIcon className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title || 'Réalisation parquet'}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
            {(selectedPhoto.title || selectedPhoto.description) && (
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                {selectedPhoto.title && (
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedPhoto.title}
                  </h3>
                )}
                {selectedPhoto.description && (
                  <p className="text-gray-200">{selectedPhoto.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LocalGallery;
