import { useState, useEffect, useRef } from 'react';
import { getPins } from '../services/firestore';
import PinterestPin from '../components/Pinterest/PinterestPin';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';

export default function PinsPage() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const observerRef = useRef();

  const loadPins = async () => {
    if (loading && pins.length > 0) return;

    setLoading(true);
    try {
      const result = await getPins(lastDoc, 20);
      if (result.pins.length === 0) {
        setHasMore(false);
      } else {
        setPins(prev => [...prev, ...result.pins]);
        setLastDoc(result.lastDoc);
      }
    } catch (error) {
      console.error('Error loading pins:', error);
    } finally {
      setLoading(false);
    }
  };

  const openImageModal = (pin) => {
    setSelectedPin(pin);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPin(null);
  };

  useEffect(() => {
    loadPins();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPins();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, lastDoc]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-white">คลัง</span>
            <span className="text-gradient-gold ml-2">รูปภาพ</span>
          </h1>
          <p className="text-gray-400 text-lg">คลิกรูปเพื่อดูรายละเอียด • กด Save เพื่อบันทึก</p>
        </div>

        {/* Loading Skeleton */}
        {loading && pins.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <LoadingSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        )}

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {pins.map((pin) => (
            <PinterestPin
              key={pin.id}
              pin={pin}
              onImageClick={openImageModal}
            />
          ))}
        </div>

        {/* Loading More */}
        {loading && pins.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          </div>
        )}

        {/* Observer target */}
        <div ref={observerRef} className="h-10" />

        {!hasMore && pins.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">🎨 ไม่มีรูปภาพเพิ่มเติม</p>
          </div>
        )}

        {/* Image Modal */}
        {showModal && selectedPin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={closeModal}>
            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors text-2xl"
              >
                ✕
              </button>

              {/* Image */}
              <img
                src={selectedPin.imageUrl}
                alt={selectedPin.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{selectedPin.title}</h3>
                {selectedPin.sourceUrl && (
                  <a
                    href={selectedPin.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold/80 transition-colors"
                  >
                    ดูแหล่งที่มา →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
