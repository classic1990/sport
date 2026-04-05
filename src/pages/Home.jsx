import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeagues, getTeams } from '../services/firestore';
import TeamCard from '../components/Team/TeamCard';

export default function Home() {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [popularTeams, setPopularTeams] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const premierLeague = leagues.find(l => l.id === 'premier-league');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Luxury Gold with 3D Logo */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden marble-section">
        <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* 3D Logo - Left Side */}
          <div className="hidden md:flex flex-shrink-0 w-1/3 max-w-sm items-center justify-center">
            <div className="logo-3d-container">
              <img
                src="/logo.png"
                alt="SPORTCUT"
                className="w-full h-auto logo-3d"
              />
            </div>
          </div>

          {/* Hero Content - Right Side */}
          <div className="flex-1 text-center md:text-left">
            <div className="gold-border rounded-3xl p-8 luxury-card inline-block">
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-black mb-6 tracking-tight text-white">
                ออกแบบโปสเตอร์กีฬาให้สุด
                <br />
                <span className="text-gold">
                  ไดคัทพร้อมใช้
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-10 max-w-xl">
                ประหยัดเวลาลบพื้นหลัง! แหล่งรวมไฟล์ PNG นักเตะระดับ 4K โลโก้ และเทมเพลต
                จัดเต็มครบทุกทีม คัดลอกไปใช้ใน Photoshop ได้ทันที
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#teams"
                  className="btn-gold"
                >
                  สำรวจคลังรูปภาพ
                </a>
                <button className="px-8 py-3 rounded-full font-bold border border-gold/50 text-gold hover:bg-gold/10 transition-all">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gold-divider max-w-4xl mx-auto" />

      {/* Premier League Section */}
      <div id="teams" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <img
                src={premierLeague?.logo}
                className="h-8"
                alt="PL"
              />
              <span className="text-gold">{premierLeague?.thaiName}</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">เลือกทีมเพื่อดูรูปไดคัทนักเตะทั้งหมด</p>
          </div>
          <Link
            to={`/league/${premierLeague?.id}`}
            className="text-gold text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
          >
            ดูทั้งหมด <i className="fa-solid fa-arrow-right ml-1"></i>
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      <div className="gold-divider max-w-4xl mx-auto" />

      {/* Other Leagues Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-8"><span className="text-gold">ลีกอื่นๆ</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {leagues.filter(l => l.id !== 'premier-league').map(league => (
            <Link
              key={league.id}
              to={`/league/${league.id}`}
              className="group luxury-card p-6 flex flex-col items-center justify-center cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 mb-3 relative flex items-center justify-center">
                <img
                  src={league.logo}
                  alt={league.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
              <h3 className="font-semibold text-center text-sm text-gray-200 group-hover:text-gold transition-colors">
                {league.thaiName}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
