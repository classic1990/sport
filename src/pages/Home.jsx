import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeagues, getTeams } from '../services/firestore';
import TeamCard from '../components/Team/TeamCard';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';

export default function Home() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [popularTeams, setPopularTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [leaguesData, teamsData] = await Promise.all([
          getLeagues(),
          getTeams()
        ]);
        setLeagues(leaguesData);
        setTeams(teamsData);
        setPopularTeams(teamsData.slice(0, 6));
      } catch (error) {
        // Silently handle error in production
      } finally {
        setLoading(false);
        // Trigger page load animation
        setTimeout(() => setPageLoaded(true), 100);
      }
    };
    fetchData();
  }, []);

  const premierLeague = leagues.find(l => l.id === 'premier-league');

  if (loading) {
    return <LoadingSkeleton type="hero" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        ข้ามไปยังเนื้อหาหลัก
      </a>

      {/* Premium Hero Section - World Class Design */}
      <div className="relative min-h-screen md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-10 left-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-gold/20 to-transparent rounded-full blur-3xl animate-pulse ${pageLoaded ? 'glow-in' : ''}`}></div>
          <div className={`absolute bottom-10 right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-l from-gold/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000 ${pageLoaded ? 'glow-in' : ''}`}></div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-gold/10 to-transparent rounded-full blur-3xl ${pageLoaded ? 'glow-in' : ''}`}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 ${pageLoaded ? 'page-load-animate' : 'opacity-0'}`}>
          <div className="text-center">
            {/* Premium Logo Display */}
            <div className={`mb-8 md:mb-12 relative inline-block ${pageLoaded ? 'scale-in' : 'opacity-0'}`}>
              {/* Multiple Glow Rings */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full blur-3xl animate-pulse scale-150"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-full blur-2xl animate-pulse scale-125"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse scale-110"></div>

              <div className="relative bg-gradient-to-br from-gray-900 to-black p-10 md:p-16 rounded-3xl border-2 border-gold/50 shadow-2xl smooth-transition-slow">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/15 to-transparent rounded-full blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-full blur-lg"></div>

                <img
                  src="/logo.png"
                  alt="SPORTCUT"
                  className="relative w-40 h-40 md:w-80 md:h-80 mx-auto object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300 img-smooth-load"
                  onLoad={(e) => e.target.classList.add('loaded')}
                />
              </div>
            </div>

            {/* Premium Heading */}
            <div className={`mb-6 md:mb-8 ${pageLoaded ? 'slide-in-left' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black mb-4 md:mb-6 tracking-tight relative">
                {/* HDR Shadow Effects */}
                <span className="absolute inset-0 text-white/20 blur-2xl transform translate-x-2 translate-y-2 z-0">ดุ่ยSPORT cut</span>
                <span className="absolute inset-0 text-gold/10 blur-3xl transform -translate-x-1 -translate-y-1 z-0">ดุ่ยSPORT cut</span>

                {/* Main Text with Gradients */}
                <span className="relative z-10 text-white drop-shadow-2xl">ดุ่ย</span>
                <span className="relative z-10 text-gradient-sport ml-2 md:ml-3 drop-shadow-lg">SPORT</span>
                <span className="relative z-10 text-gradient-modern ml-2 md:ml-3 drop-shadow-lg">cut</span>
              </h1>
              <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-3 md:mb-4 relative">
                <span className="relative z-10 drop-shadow-lg">ออกแบบโปสเตอร์กีฬา</span>
                <span className="text-gradient-gold block mt-1 md:mt-2 relative z-10 drop-shadow-lg">ระดับโลก</span>
              </div>
            </div>

            {/* Premium Description */}
            <p className={`text-base md:text-lg lg:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4 smooth-transition-slow ${pageLoaded ? 'slide-in-right' : 'opacity-0'}`}>
              แหล่งรวมไฟล์ PNG นักเตะระดับ 4K คุณภาพพรีเมียม
              <span className="text-gold font-semibold"> โลโก้ทีม </span>
              และเทมเพลตสำเร็จรูป พร้อมใช้งานใน Photoshop ทันที
            </p>

            {/* Premium CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4 ${pageLoaded ? 'scale-in' : 'opacity-0'}`}>
              <a
                href="#teams"
                className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 text-base md:text-lg font-bold text-black bg-gradient-to-r from-gold to-gold-dark rounded-full shadow-2xl hover:shadow-gold transition-all duration-300 hover:scale-105 min-h-[44px]"
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  <i className="fas fa-rocket text-lg md:text-xl"></i>
                  <span className="hidden sm:inline">เริ่มสำรวจคลังรูปภาพ</span>
                  <span className="sm:hidden">สำรวจรูปภาพ</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <button className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 text-base md:text-lg font-bold text-gold border-2 border-gold/50 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300 hover:scale-105 min-h-[44px]">
                <span className="flex items-center gap-2 md:gap-3">
                  <i className="fas fa-users text-lg md:text-xl"></i>
                  <span className="hidden sm:inline">เข้าร่วมคอมมูนิตี้</span>
                  <span className="sm:hidden">คอมมูนิตี้</span>
                </span>
              </button>
            </div>

            {/* Premium Stats - Mobile Optimized */}
            <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient-gold mb-2">500+</div>
                <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">นักเตะคุณภาพ 4K</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient-gold mb-2">20+</div>
                <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">ลีกดังทั่วโลก</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient-gold mb-2">1000+</div>
                <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">เทมเพลตพร้อมใช้</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-4 h-8 md:w-6 md:h-10 border-2 border-gold/50 rounded-full flex justify-center">
            <div className="w-1 h-2 md:h-3 bg-gold rounded-full mt-1 md:mt-2 animate-pulse"></div>
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

      {/* Premier League Section - Premium Design */}
      <div id="main-content" id="teams" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-3 border border-gold/30 shadow-xl">
              <img
                src={premierLeague?.logo}
                className="w-full h-full object-contain"
                alt="PL"
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                <span className="text-gradient-gold">{premierLeague?.thaiName}</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">เลือกทีมเพื่อดูรูปไดคัทนักเตะทั้งหมด</p>
            </div>
          </div>
          <Link
            to={`/league/${premierLeague?.id}`}
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors group"
          >
            <span className="font-medium">ดูทั้งหมด</span>
            <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>

        {/* Premium Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {popularTeams.length > 0 ? (
            popularTeams.map((team, index) => (
              <div
                key={team.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <TeamCard team={team} />
              </div>
            ))
          ) : (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={`skeleton-${index}`} type="team" />
            ))
          )}
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

      {/* Other Leagues Section - Premium Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 heading-thai">
            ลีกฟุตบอล
            <span className="text-gradient-gold block mt-2">ทั่วโลก</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            คัดสรรลีกดังจากทั่วทุกมุมโลก พร้อมทีมและนักเตะคุณภาพ
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {leagues.filter(l => l.id !== 'premier-league').length > 0 ? (
            leagues.filter(l => l.id !== 'premier-league').map((league, index) => (
              <Link
                key={league.id}
                to={`/league/${league.id}`}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"></div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-2xl group-hover:shadow-gold/20 hover-3d">
                  {/* Logo Container */}
                  <div className="w-28 h-28 mx-auto mb-6 relative flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-md border border-white/20 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-2xl"></div>
                    <img
                      src={league.logo}
                      alt={league.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-125 transition-transform duration-700 drop-shadow-2xl relative z-10"
                      onError={(e) => e.target.style.display = 'none'}
                      loading="lazy"
                    />
                  </div>

                  {/* League Name */}
                  <h3 className="font-bold text-center text-xl text-white group-hover:text-gradient-gold transition-all duration-500 tracking-wide font-thai-sans mb-2">
                    {league.thaiName}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-light text-center">
                    {league.name}
                  </p>

                  {/* Hover Indicator */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
              </Link>
            ))
          ) : (
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={`skeleton-${index}`} type="league" />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
