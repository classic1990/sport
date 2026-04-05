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
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-b border-gold/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-2 rounded-2xl border border-gold/30">
                <img
                  src="/logo.png"
                  alt="SPORTCUT"
                  className="h-12 w-auto object-contain filter drop-shadow-lg"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-black text-white">SPORT</div>
              <div className="text-xl font-black text-gradient-gold -mt-1">CUT</div>
            </div>
          </Link>

          {/* Premium Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gold/70"></i>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  className="block w-full pl-12 pr-6 py-4 bg-gradient-to-r from-gray-900/90 to-black/90 border border-gold/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 backdrop-blur-sm transition-all duration-300 text-base"
                  placeholder="ค้นหานักเตะ, ทีม, หรือท่าทาง..."
                />
              </div>
            </div>
          </div>

          {/* Premium Right Menu */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/pins"
                className="group flex items-center gap-2 text-gray-300 hover:text-gold transition-all duration-300 font-medium"
              >
                <i className="fas fa-images text-lg group-hover:scale-110 transition-transform"></i>
                <span>คลังรูปภาพ</span>
              </Link>
              <Link
                to="/logos"
                className="group flex items-center gap-2 text-gray-300 hover:text-gold transition-all duration-300 font-medium"
              >
                <i className="fas fa-shield-alt text-lg group-hover:scale-110 transition-transform"></i>
                <span>โลโก้ทีม</span>
              </Link>
              <button className="group flex items-center gap-2 text-gray-300 hover:text-gold transition-all duration-300 font-medium">
                <i className="fas fa-upload text-lg group-hover:scale-110 transition-transform"></i>
                <span>อัปโหลดรูป</span>
              </button>
              <button className="group flex items-center gap-2 text-gray-300 hover:text-gold transition-all duration-300 font-medium">
                <i className="fas fa-fire text-lg group-hover:scale-110 transition-transform"></i>
                <span>กำลังฮิต</span>
              </button>
            </div>

            {/* Premium CTA Button */}
            <Link
              to="/admin/login"
              className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-black bg-gradient-to-r from-gold to-gold-dark rounded-full shadow-lg hover:shadow-gold transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-crown"></i>
                เข้าสู่ระบบ
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300 hover:text-gold transition-colors">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
