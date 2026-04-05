import { useState, useEffect } from 'react';
import { getTeams } from '../services/firestore';

export default function LogoGallery() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState('all');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const teamsData = await getTeams();

        // Filter by league if selected
        const filteredTeams = selectedLeague === 'all'
          ? teamsData
          : teamsData.filter(team => team.leagueId === selectedLeague);

        setTeams(filteredTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [selectedLeague]);

  const leagues = [
    { id: 'all', name: 'ทุกลีก', thaiName: 'ทุกลีก' },
    { id: 'premier-league', name: 'Premier League', thaiName: 'พรีเมียร์ลีก' },
    { id: 'laliga', name: 'La Liga', thaiName: 'ลาลีกา' },
    { id: 'serie-a', name: 'Serie A', thaiName: 'เซเรีย อา' },
    { id: 'bundesliga', name: 'Bundesliga', thaiName: 'บุนเดสลีกา' },
    { id: 'ligue-1', name: 'Ligue 1', thaiName: 'ลีกเอิง' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">กำลังโหลดโลโก้ทีม...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-futbol text-white"></i>
              </div>
              <h1 className="text-xl font-bold">โลโก้ทีมฟุตบอล</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                <i className="fa-solid fa-home mr-2"></i>หน้าหลัก
              </a>
              <a href="/logos" className="text-white font-medium">
                <i className="fa-solid fa-images mr-2"></i>โลโก้ทีม
              </a>
              <a href="/admin/login" className="text-gray-300 hover:text-white transition-colors">
                <i className="fa-solid fa-user-shield mr-2"></i>Admin
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* League Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">คลังโลโก้ทีมฟุตบอล</h2>
          <p className="text-gray-400 mb-6">รวบรวมโลโก้ทีมจาก 5 ลีกดังของยุโรป</p>

          <div className="flex flex-wrap gap-2">
            {leagues.map((league) => (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(league.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedLeague === league.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {league.thaiName}
              </button>
            ))}
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="group bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => window.open(`/team/${team.id}`, '_blank')}
            >
              <div className="relative mb-3">
                <div className={`aspect-square rounded-lg bg-gradient-to-br ${team.gradient || 'from-gray-600 to-gray-800'} p-4 flex items-center justify-center group-hover:shadow-lg transition-shadow`}>
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-full h-full object-contain filter drop-shadow-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full items-center justify-center text-white text-4xl hidden">
                    <i className="fa-solid fa-shield-alt"></i>
                  </div>
                </div>

                {/* League Badge */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {team.shortName || 'TM'}
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-red-400 transition-colors">
                  {team.thaiName || team.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {team.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">
              <i className="fa-solid fa-trophy"></i> 5
            </div>
            <p className="text-gray-300">ลีกดัง</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              <i className="fa-solid fa-users"></i> {teams.length}
            </div>
            <p className="text-gray-300">ทีมทั้งหมด</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              <i className="fa-solid fa-download"></i> ฟรี
            </div>
            <p className="text-gray-300">ดาวน์โหลดได้</p>
          </div>
        </div>

        {/* Download Info */}
        <div className="mt-12 bg-gray-800 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">
            <i className="fa-solid fa-info-circle mr-2"></i>ข้อมูลโลโก้
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">📐 ขนาดไฟล์</h4>
              <ul className="space-y-1 text-sm">
                <li>• SVG: สำหรับงานพิมพ์ขนาดใหญ่</li>
                <li>• PNG: พื้นหลังโปร่งใส</li>
                <li>• ความละเอียด: สูงสุด 1200x1200px</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🎨 รูปแบบที่รองรับ</h4>
              <ul className="space-y-1 text-sm">
                <li>• คลิกที่โลโก้ → ดูหน้าทีม</li>
                <li>• คลิกขวา → บันทึกรูป</li>
                <li>• ใช้งานได้ฟรีไม่มีลิขสิทธิ์</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">SportCut - คลังรูปภาพฟุตบอลที่ใหญ่ที่สุดในไทย</p>
            <p className="text-sm">© 2024 SportCut. All logos belong to their respective owners.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
