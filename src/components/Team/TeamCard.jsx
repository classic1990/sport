import { Link } from 'react-router-dom';

// Team color mapping based on team ID or name
const getTeamColorClass = (teamId) => {
  const colorMap = {
    'ac-milan': 'team-milan',
    'milan': 'team-milan',
    'alaves': 'team-alaves',
    'arsenal': 'team-arsenal',
    'aston-villa': 'team-astonvilla',
    'atalanta': 'team-atalanta',
    'athletic-bilbao': 'team-athletic',
    'barcelona': 'team-barcelona',
    'bayern-munich': 'team-bayern',
    'bayern': 'team-bayern',
    'chelsea': 'team-chelsea',
    'manchester-city': 'team-city',
    'city': 'team-city',
    'liverpool': 'team-liverpool',
    'real-madrid': 'team-madrid',
    'madrid': 'team-madrid',
    'manchester-united': 'team-united',
    'united': 'team-united',
    'juventus': 'team-juventus',
    'psg': 'team-psg',
    'tottenham': 'team-tottenham',
    'inter': 'team-inter',
    'napoli': 'team-napoli',
    'roma': 'team-roma',
    'dortmund': 'team-dortmund',
    'leverkusen': 'team-leverkusen',
    'leipzig': 'team-leipzig',
    'lyon': 'team-lyon',
    'marseille': 'team-marseille',
    'monaco': 'team-monaco',
    'psv': 'team-psv',
    'ajax': 'team-ajax',
    'porto': 'team-porto',
    'benfica': 'team-benfica',
    'sporting': 'team-sporting',
    'celtic': 'team-celtic',
    'rangers': 'team-rangers',
  };

  // Check if teamId matches any key
  for (const [key, value] of Object.entries(colorMap)) {
    if (teamId?.toLowerCase().includes(key)) {
      return value;
    }
  }

  // Default fallback
  return 'team-default';
};

export default function TeamCard({ team }) {
  const teamColorClass = getTeamColorClass(team.id);

  return (
    <Link
      to={`/team/${team.id}`}
      className={`group relative ${teamColorClass} team-card overflow-hidden`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>

      {/* Premium Logo Container */}
      <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-md border border-white/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-2xl"></div>
        <img
          src={team.logo}
          alt={team.name}
          className="max-h-full max-w-full object-contain group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl relative z-10"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <i className="fa-solid fa-shield-halved text-5xl text-white/80 hidden"></i>
      </div>

      {/* Team Name */}
      <div className="relative z-10 text-center">
        <h3 className="font-bold text-center text-base text-white drop-shadow-lg mb-1 font-thai-sans">
          {team.thaiName}
        </h3>
        <p className="text-xs text-white/70 uppercase tracking-widest font-light">
          {team.shortName}
        </p>
      </div>

      {/* Hover Indicator */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
    </Link>
  );
}
