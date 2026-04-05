import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLeagueById, getTeamsByLeague } from '../services/firestore';
import TeamCard from '../components/Team/TeamCard';

export default function League() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [leagueData, teamsData] = await Promise.all([
          getLeagueById(leagueId),
          getTeamsByLeague(leagueId)
        ]);
        setLeague(leagueData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching league data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [leagueId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-600 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!league) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-400">ไม่พบลีกที่คุณค้นหา</h2>
          <Link to="/" className="text-accent mt-4 inline-block">กลับหน้าหลัก</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* League Header */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8 relative z-10">
          <Link
            to="/"
            className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors"
          >
            <i className="fa-solid fa-chevron-left"></i> กลับไปหน้าหลัก
          </Link>
          <div className="flex items-center gap-4">
            <img src={league.logo} alt={league.name} className="h-16 md:h-20 object-contain" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {league.thaiName}
              </h1>
              <p className="text-gray-400 mt-1">{teams.length} ทีม</p>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-white mb-6">เลือกทีม</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
