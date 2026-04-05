import { useState } from 'react';

export default function ImageCard({ image, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl bg-card border border-gray-800 overflow-hidden hover:border-gray-500 hover:shadow-xl transition-all flex flex-col h-64 md:h-80 relative"
    >
      {/* Image Container */}
      <div className="w-full h-full flex-grow bg-checkerboard relative overflow-hidden flex justify-center items-end p-2">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-accent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={image.urls.thumbnail}
          alt={image.playerName}
          className={`w-full h-[90%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 origin-bottom ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20fill%3D%22%23333%22%20width%3D%22200%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%23777%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EIMAGE%20NOT%20FOUND%3C%2Ftext%3E%3C%2Fsvg%3E';
          }}
        />

        {/* Hover Overlay Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h4 className="text-white font-bold text-sm truncate">{image.playerName}</h4>
          <div className="flex gap-1 mt-1 flex-wrap">
            {image.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-white/20 backdrop-blur text-white px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              className="flex-1 bg-white text-dark py-1.5 rounded text-xs font-bold hover:bg-gray-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
