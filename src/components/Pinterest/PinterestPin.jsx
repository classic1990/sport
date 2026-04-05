import { useState } from 'react';

export default function PinterestPin({ pin, onImageClick }) {
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

  const handleDownloadImage = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = pin.imageUrl;
      link.download = `${pin.title || 'sportcut-image'}-${pin.id}.png`;
      link.target = '_blank';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open image in new tab
      window.open(pin.imageUrl, '_blank');
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onImageClick) {
      onImageClick(pin);
    }
  };

  const handleCardClick = () => {
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
      onClick={handleCardClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-800 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-gold/10 luxury-card">
        {/* Image */}
        <img
          src={pin.imageUrl}
          alt={pin.title}
          className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
          onClick={handleImageClick}
        />

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {/* Pinterest Save Button */}
          <button
            onClick={handleSaveToPinterest}
            className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full font-semibold text-xs flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <i className="fab fa-pinterest"></i>
            Save
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownloadImage}
            className="absolute top-3 left-3 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-full font-semibold text-xs flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <i className="fas fa-download"></i>
            Download
          </button>

          {/* View Details Button */}
          <button
            onClick={handleImageClick}
            className="absolute bottom-3 left-3 right-3 bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-full font-semibold text-sm transition-all transform hover:scale-105 shadow-lg"
          >
            <i className="fas fa-expand mr-2"></i>
            ดูรูปใหญ่
          </button>
        </div>

        {/* Title Overlay */}
        {pin.title && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-white font-semibold text-sm line-clamp-2">{pin.title}</h3>
            {pin.description && (
              <p className="text-gray-300 text-xs line-clamp-2">
                {pin.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
