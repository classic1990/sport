import { Link } from 'react-router-dom';

export default function LeagueCard({ league }) {
  return (
    <Link
      to={`/league/${league.id}`}
      className="group glass-card p-6 flex flex-col items-center justify-center cursor-pointer hover:-translate-y-1 transition-all duration-300 glow-effect"
    >
      <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
        <img
          src={league.logo}
          alt={league.name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <h3 className="font-semibold text-center text-sm text-gray-200 group-hover:text-white">
        {league.thaiName}
      </h3>
      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
        {league.name}
      </p>
    </Link>
  );
}
