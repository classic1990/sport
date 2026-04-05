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
      className={`group ${teamColorClass} team-card`}
    >
      <div className="w-20 h-20 mb-4 relative flex items-center justify-center z-10">
        <img
          src={team.logo}
          alt={team.name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <i className="fa-solid fa-shield-halved text-4xl text-white/80 hidden"></i>
      </div>
      <h3 className="font-semibold text-center text-sm text-white drop-shadow-md z-10">
        {team.thaiName}
      </h3>
      <p className="text-xs text-white/70 mt-1 uppercase tracking-wider z-10">
        {team.shortName}
      </p>
    </Link>
  );
}
