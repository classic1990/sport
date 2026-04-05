import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="luxury-nav fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            <img
              src="/logo.png"
              alt="SPORTCUT"
              className="h-10 w-auto"
            />
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-burgundy/50 rounded-full bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:text-sm transition-colors"
                placeholder="ค้นหานักเตะ, ทีม, หรือท่าทาง..."
              />
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/pins"
              className="hidden md:block text-gray-300 hover:text-gold transition-colors text-sm font-medium"
            >
              <i className="fa-solid fa-images mr-1 text-burgundy-light"></i> คลังรูปภาพ
            </Link>
            <Link
              to="/logos"
              className="hidden md:block text-gray-300 hover:text-gold transition-colors text-sm font-medium"
            >
              <i className="fa-solid fa-images mr-1 text-burgundy-light"></i> โลโก้ทีม
            </Link>
            <button className="hidden md:block text-gray-300 hover:text-gold transition-colors text-sm font-medium">
              <i className="fa-solid fa-upload mr-1 text-burgundy-light"></i> อัปโหลดรูป
            </button>
            <button className="text-gray-300 hover:text-gold transition-colors text-sm font-medium">
              <i className="fa-solid fa-fire mr-1 text-burgundy-light"></i> กำลังฮิต
            </button>
            <Link
              to="/admin/login"
              className="btn-gold px-4 py-1.5 rounded-full text-sm"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
