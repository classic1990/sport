import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamById, getImagesByTeam } from '../services/firestore';
import ImageCard from '../components/Image/ImageCard';
import ImageModal from '../components/Image/ImageModal';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';

export default function Team() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teamData, imagesData] = await Promise.all([
          getTeamById(teamId),
          getImagesByTeam(teamId)
        ]);
        setTeam(teamData);
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [teamId]);

  if (!team) {
    return <LoadingSkeleton type="hero" />;
  }

  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter(img => img.type === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Skip to main content for accessibility */}
      <a href="#team-content" className="skip-link">
        ข้ามไปยังเนื้อหาหลัก
      </a>

      {/* Premium Team Header */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/10 to-transparent opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Team Logo */}
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gold/30 shadow-2xl inline-block">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain filter drop-shadow-2xl"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            </div>

            {/* Team Name */}
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              <span className="text-white">{team.thaiName}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gradient-gold font-bold mb-4">
              {team.name}
            </p>

            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-8">
              <Link to="/" className="hover:text-gold transition-colors">หน้าแรก</Link>
              <span>/</span>
              <Link to={`/league/${team.leagueId}`} className="hover:text-gold transition-colors">
                {team.leagueName}
              </Link>
              <span>/</span>
              <span className="text-gold">{team.thaiName}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Premium Divider */}
      <div className="relative py-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-gold rounded-full shadow-lg shadow-gold/50"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="team-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'player', 'celebration', 'action'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === filter
                ? 'bg-gradient-to-r from-gold to-gold-dark text-black shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
            >
              {filter === 'all' && 'ทั้งหมด'}
              {filter === 'player' && 'นักเตะ'}
              {filter === 'celebration' && 'ฉลอง'}
              {filter === 'action' && 'จังหวะ'}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
              <i className="fas fa-images text-3xl text-gray-600"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">ไม่พบรูปภาพ</h3>
            <p className="text-gray-400">ยังไม่มีรูปภาพในหมวดหมู่นี้</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
