import { useEffect } from 'react';
import { useState } from 'react';
import { getTeamById } from '../../data';

export default function ImageModal({ image, isOpen, onClose }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const team = image ? getTeamById(image.teamId) : null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  const handleCopy = async () => {
    setIsCopied(true);
    // จำลองการ copy - ในระบบจริงต้อง fetch รูปแล้ว copy เป็น blob
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = image.urls.full;
    link.download = `sportcut_${image.playerName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-card rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-4xl mx-4 border border-gray-700 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors"
        >
          <i className="fa-solid fa-times"></i>
        </button>

        {/* Image Preview (Checkerboard) */}
        <div className="w-full md:w-3/5 bg-checkerboard relative min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8 group">
          <img
            src={image.urls.preview}
            alt={image.playerName}
            className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Action Panel */}
        <div className="w-full md:w-2/5 p-6 flex flex-col bg-darker">
          <div className="mb-4">
            <span className="inline-block px-2 py-1 bg-gray-800 rounded text-xs font-semibold text-gray-300 mb-2">
              {team?.thaiName || 'Unknown Team'}
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">{image.playerName}</h3>
            <p className="text-gray-400 text-sm">
              ความละเอียด: {image.dimensions.width} x {image.dimensions.height} px (PNG)
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {image.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <button
              onClick={handleCopy}
              className={`w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-gray-600 ${isCopied ? 'border-green-500 text-green-400' : ''}`}
            >
              <i className={`fa-solid ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
              {isCopied ? 'คัดลอกสำเร็จ!' : 'คัดลอกรูปภาพ (Copy)'}
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full py-3 px-4 bg-accent hover:bg-red-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
            >
              <i className="fa-solid fa-download"></i>
              {isDownloading ? 'กำลังดาวน์โหลด...' : 'ดาวน์โหลดไฟล์ PNG'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              คัดลอกแล้วนำไปวาง (Ctrl+V) ใน Photoshop ได้ทันที
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
