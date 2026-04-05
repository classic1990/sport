import { useState, useEffect, useRef } from 'react';
import { getPins } from '../services/firestore';
import PinterestPin from '../components/Pinterest/PinterestPin';

export default function PinsPage() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
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
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          <span className="text-gold">คลังรูปภาพ</span> ทั้งหมด
        </h1>
        
        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {pins.map((pin) => (
            <PinterestPin key={pin.id} pin={pin} />
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          </div>
        )}

        {/* Observer target */}
        <div ref={observerRef} className="h-10" />
        
        {!hasMore && pins.length > 0 && (
          <p className="text-center text-gray-500 py-8">ไม่มีรูปภาพเพิ่มเติม</p>
        )}
      </div>
    </div>
  );
}
