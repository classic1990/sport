import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamById, getImagesByTeam } from '../services/firestore';
import ImageCard from '../components/Image/ImageCard';
import ImageModal from '../components/Image/ImageModal';

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-600 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter(img => img.type === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Team Header */}
      <div className={`relative w-full h-64 md:h-80 bg-gradient-to-br ${team.gradient} overflow-hidden border-b border-gray-800`}>
        {/* Decor */}
        <div className="absolute -right-20 -bottom-20 opacity-10 mix-blend-overlay">
          <img src={team.logo} className="w-96 h-96 object-contain filter grayscale" alt="decor" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
              <img src={team.logo} alt={team.name} className="w-full h-full object-contain drop-shadow-xl" />
            </div>
            <div>
              <Link
                to="/"
                className="text-gray-400 hover:text-white text-sm mb-2 flex items-center gap-1 transition-colors"
              >
                <i className="fa-solid fa-chevron-left"></i> กลับไปหน้าหลัก
              </Link>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {team.thaiName}
              </h1>
              <p className="text-gray-300 mt-2 font-medium">{team.name} Graphic Resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Gallery Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 border-b border-gray-800 pb-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeFilter === 'all'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setActiveFilter('cutout')}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeFilter === 'cutout'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            รูปไดคัท (Cut-outs)
          </button>
          <button
            onClick={() => setActiveFilter('action')}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeFilter === 'action'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            แอ็คชั่นช็อต
          </button>
          <button
            onClick={() => setActiveFilter('logo')}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeFilter === 'logo'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            โลโก้ & กราฟิก
          </button>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredImages.map(image => (
              <ImageCard
                key={image.id}
                image={image}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-700">
              <i className="fa-solid fa-camera-retro text-3xl text-gray-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              ยังไม่มีรูปภาพสำหรับทีมนี้
            </h3>
            <p className="text-gray-500 mb-6">
              ทีมงานกำลังทยอยอัปเดตไฟล์ไดคัทของทีม {team.thaiName} เร็วๆ นี้
            </p>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-700 transition border border-gray-600">
              <i className="fa-solid fa-bell mr-2"></i> แจ้งเตือนเมื่อมีการอัปเดต
            </button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
