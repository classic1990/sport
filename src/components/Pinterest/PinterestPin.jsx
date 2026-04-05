import { useState } from 'react';

export default function PinterestPin({ pin }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSaveToPinterest = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(pin.sourceUrl || window.location.href)}&media=${encodeURIComponent(pin.imageUrl)}&description=${encodeURIComponent(pin.title || '')}`;
    window.open(url, '_blank', 'width=750,height=550');
  };

  const handleClick = () => {
    if (pin.sourceUrl) {
      window.open(pin.sourceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (imageError) return null;

  return (
    <div 
      className="break-inside-avoid mb-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-800 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-gold/10">
        {/* Image */}
        <img
          src={pin.imageUrl}
          alt={pin.title}
          className="w-full h-auto object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {/* Pinterest Save Button */}
          <button
            onClick={handleSaveToPinterest}
            className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <i className="fa-brands fa-pinterest text-lg"></i>
            Save
          </button>
          
          {/* Title & Description */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
              {pin.title}
            </h3>
            {pin.description && (
              <p className="text-gray-300 text-xs line-clamp-2">
                {pin.description}
              </p>
            )}
            
            {/* Tags */}
            {pin.tags && pin.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {pin.tags.slice(0, 3).map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-white/20 text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
