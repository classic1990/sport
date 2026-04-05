import { useState } from 'react';

export default function ImageDownloadButton({ imageUrl, fileName, className = '' }) {
  const [downloading, setDownloading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleDownload = async (format = 'original') => {
    setDownloading(true);
    setShowMenu(false);
    
    try {
      // Fetch the image
      const response = await fetch(imageUrl, {
        mode: 'cors',
        headers: {
          'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename based on format
      const baseName = fileName?.replace(/[^a-zA-Z0-9]/g, '_') || 'image';
      const extension = format === 'png' ? 'png' : 
                       format === 'jpg' ? 'jpg' : 
                       imageUrl.split('.').pop()?.split('?')[0] || 'png';
      
      link.download = `${baseName}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      
      // Show success feedback
      showSuccessToast();
      
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  const showSuccessToast = () => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 z-50 animate-fade-in';
    toast.innerHTML = `
      <div class="bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-green-500">
        <i class="fa-solid fa-check-circle"></i>
        <span class="font-medium">ดาวน์โหลดสำเร็จ!</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Main Download Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={downloading}
        className={`
          group relative overflow-hidden
          px-4 py-2 rounded-xl
          bg-gradient-to-br from-red-600 via-red-700 to-red-800
          hover:from-red-500 hover:via-red-600 hover:to-red-700
          text-white font-medium
          shadow-[0_4px_0_0_#991b1b,0_6px_12px_rgba(220,38,38,0.4)]
          hover:shadow-[0_3px_0_0_#991b1b,0_4px_8px_rgba(220,38,38,0.5)]
          hover:translate-y-[1px]
          active:shadow-[0_1px_0_0_#991b1b,0_2px_4px_rgba(220,38,38,0.4)]
          active:translate-y-[3px]
          transition-all duration-150
          disabled:opacity-70 disabled:cursor-not-allowed
          flex items-center gap-2
          ${className}
        `}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        
        {downloading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>กำลังดาวน์โหลด...</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-download group-hover:animate-bounce" />
            <span>ดาวน์โหลด</span>
            <i className={`fa-solid fa-chevron-down text-xs transition-transform ${showMenu ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showMenu && !downloading && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-600 overflow-hidden min-w-[200px]">
              {/* Header */}
              <div className="px-4 py-2 bg-gray-700/50 border-b border-gray-600">
                <p className="text-xs text-gray-400">เลือกรูปแบบไฟล์</p>
              </div>
              
              {/* Options */}
              <button
                onClick={() => handleDownload('original')}
                className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center">
                  <i className="fa-solid fa-file-image text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">ต้นฉบับ</p>
                  <p className="text-xs text-gray-400">ตามรูปแบบเดิม</p>
                </div>
              </button>
              
              <button
                onClick={() => handleDownload('png')}
                className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-3 transition-colors border-t border-gray-700"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center">
                  <i className="fa-solid fa-file-png text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">PNG</p>
                  <p className="text-xs text-gray-400">คุณภาพสูง, โปร่งใส</p>
                </div>
              </button>
              
              <button
                onClick={() => handleDownload('jpg')}
                className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-3 transition-colors border-t border-gray-700"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-600/30 flex items-center justify-center">
                  <i className="fa-solid fa-file-jpg text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">JPG</p>
                  <p className="text-xs text-gray-400">ขนาดเล็ก</p>
                </div>
              </button>
              
              {/* Quick Actions */}
              <div className="px-4 py-2 bg-gray-700/30 border-t border-gray-600">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(imageUrl);
                    setShowMenu(false);
                    showCopyToast();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <i className="fa-regular fa-copy" />
                  คัดลอกลิงก์
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function showCopyToast() {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 z-50 animate-fade-in';
  toast.innerHTML = `
    <div class="bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-blue-500">
      <i class="fa-solid fa-check-circle"></i>
      <span class="font-medium">คัดลอกลิงก์แล้ว!</span>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
