// ข้อมูลลีก
export const leagues = [
  {
    id: 'premier-league',
    name: 'Premier League',
    thaiName: 'พรีเมียร์ลีก',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png',
    country: 'England',
    order: 1
  },
  {
    id: 'laliga',
    name: 'La Liga',
    thaiName: 'ลาลีกา',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png',
    country: 'Spain',
    order: 2
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    thaiName: 'กัลโช่ เซเรีย อา',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/1200px-Serie_A_logo_2022.svg.png',
    country: 'Italy',
    order: 3
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    thaiName: 'บุนเดสลีกา',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
    country: 'Germany',
    order: 4
  }
];

// ข้อมูลทีม
export const teams = [
  // Premier League
  {
    id: 'manchester-united',
    leagueId: 'premier-league',
    name: 'Manchester United',
    thaiName: 'แมนเชสเตอร์ ยูไนเต็ด',
    shortName: 'MUN',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
    colors: { primary: '#DA291C', secondary: '#000000' },
    gradient: 'from-red-600 to-black',
    textGlow: 'text-red-500'
  },
  {
    id: 'manchester-city',
    leagueId: 'premier-league',
    name: 'Manchester City',
    thaiName: 'แมนเชสเตอร์ ซิตี้',
    shortName: 'MCI',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
    colors: { primary: '#6CABDD', secondary: '#FFFFFF' },
    gradient: 'from-blue-400 to-blue-700',
    textGlow: 'text-blue-400'
  },
  {
    id: 'liverpool',
    leagueId: 'premier-league',
    name: 'Liverpool',
    thaiName: 'ลิเวอร์พูล',
    shortName: 'LIV',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
    colors: { primary: '#C8102E', secondary: '#00B2A9' },
    gradient: 'from-red-600 to-red-900',
    textGlow: 'text-red-500'
  },
  {
    id: 'arsenal',
    leagueId: 'premier-league',
    name: 'Arsenal',
    thaiName: 'อาร์เซนอล',
    shortName: 'ARS',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
    colors: { primary: '#EF0107', secondary: '#FFFFFF' },
    gradient: 'from-red-500 to-red-800',
    textGlow: 'text-red-400'
  },
  {
    id: 'chelsea',
    leagueId: 'premier-league',
    name: 'Chelsea',
    thaiName: 'เชลซี',
    shortName: 'CHE',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
    colors: { primary: '#034694', secondary: '#FFFFFF' },
    gradient: 'from-blue-700 to-blue-900',
    textGlow: 'text-blue-500'
  },
  {
    id: 'tottenham',
    leagueId: 'premier-league',
    name: 'Tottenham Hotspur',
    thaiName: 'ท็อตแน่ม ฮ็อทสเปอร์',
    shortName: 'TOT',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png',
    colors: { primary: '#FFFFFF', secondary: '#132257' },
    gradient: 'from-gray-100 to-gray-400',
    textGlow: 'text-white'
  },
  // La Liga
  {
    id: 'real-madrid',
    leagueId: 'laliga',
    name: 'Real Madrid',
    thaiName: 'เรอัล มาดริด',
    shortName: 'RMA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
    colors: { primary: '#FFFFFF', secondary: '#FEBE10' },
    gradient: 'from-yellow-400 to-yellow-600',
    textGlow: 'text-yellow-400'
  },
  {
    id: 'barcelona',
    leagueId: 'laliga',
    name: 'Barcelona',
    thaiName: 'บาร์เซโลน่า',
    shortName: 'BAR',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
    colors: { primary: '#A50044', secondary: '#004D98' },
    gradient: 'from-blue-600 to-red-600',
    textGlow: 'text-blue-400'
  },
  // Serie A
  {
    id: 'juventus',
    leagueId: 'serie-a',
    name: 'Juventus',
    thaiName: 'ยูเวนตุส',
    shortName: 'JUV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png',
    colors: { primary: '#FFFFFF', secondary: '#000000' },
    gradient: 'from-gray-100 to-black',
    textGlow: 'text-white'
  },
  {
    id: 'ac-milan',
    leagueId: 'serie-a',
    name: 'AC Milan',
    thaiName: 'เอซี มิลาน',
    shortName: 'MIL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan_logo.svg/1200px-AC_Milan_logo.svg.png',
    colors: { primary: '#FB090B', secondary: '#000000' },
    gradient: 'from-red-600 to-black',
    textGlow: 'text-red-500'
  },
  // Bundesliga
  {
    id: 'bayern-munich',
    leagueId: 'bundesliga',
    name: 'Bayern Munich',
    thaiName: 'บาเยิร์น มิวนิค',
    shortName: 'BAY',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
    colors: { primary: '#DC052D', secondary: '#FFFFFF' },
    gradient: 'from-red-600 to-red-800',
    textGlow: 'text-red-500'
  },
  {
    id: 'borussia-dortmund',
    leagueId: 'bundesliga',
    name: 'Borussia Dortmund',
    thaiName: 'โบรุสเซีย ดอร์ทมุนด์',
    shortName: 'BVB',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
    colors: { primary: '#FDE100', secondary: '#000000' },
    gradient: 'from-yellow-400 to-yellow-600',
    textGlow: 'text-yellow-400'
  }
];

// ข้อมูลนักเตะและรูปภาพ (Mock Data - ใช้สำหรับ development)
// ⚠️ TODO: เปลี่ยนเป็น URL จริงจาก Firebase Storage ก่อน production
// รูปภาพปัจจุบันเป็น placeholder จาก Unsplash
export const images = [
  // Manchester United
  {
    id: 'img-1',
    teamId: 'manchester-united',
    playerName: 'บรูโน่ แฟร์นันด์ส',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['กองกลาง', 'กัปตัน', 'ดีใจ'],
    dimensions: { width: 1200, height: 1800 }
  },
  {
    id: 'img-2',
    teamId: 'manchester-united',
    playerName: 'มาร์คัส แรชฟอร์ด',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['กองหน้า', 'ยิงประตู', 'วิ่ง'],
    dimensions: { width: 1200, height: 1800 }
  },
  {
    id: 'img-3',
    teamId: 'manchester-united',
    playerName: 'อเลฮานโดร การ์นาโช่',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['กองหน้า', 'แอ็คชั่น', 'ปีก'],
    dimensions: { width: 1200, height: 1800 }
  },
  {
    id: 'img-4',
    teamId: 'manchester-united',
    playerName: 'ค็อบบี้ ไมนู',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['กองกลาง', 'ดาวรุ่ง'],
    dimensions: { width: 1200, height: 1800 }
  },
  {
    id: 'img-5',
    teamId: 'manchester-united',
    playerName: 'อังเดร โอนาน่า',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['ผู้รักษาประตู', 'เซฟ'],
    dimensions: { width: 1200, height: 1800 }
  },
  // Liverpool
  {
    id: 'img-6',
    teamId: 'liverpool',
    playerName: 'โมฮาเหม็ด ซาลาห์',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['กองหน้า', 'ยิงประตู', 'ดีใจ'],
    dimensions: { width: 1200, height: 1800 }
  },
  {
    id: 'img-7',
    teamId: 'liverpool',
    playerName: 'เวอร์จิล ฟาน ไดจ์ค',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['กองหลัง', 'กัปตัน', 'สไลด์'],
    dimensions: { width: 1200, height: 1800 }
  },
  // Arsenal
  {
    id: 'img-8',
    teamId: 'arsenal',
    playerName: 'บูคาโย ซาก้า',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['ปีก', 'ยิงประตู', 'ดาวรุ่ง'],
    dimensions: { width: 1200, height: 1800 }
  },
  // Real Madrid
  {
    id: 'img-9',
    teamId: 'real-madrid',
    playerName: 'วินิซิอุส จูเนียร์',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['ปีก', 'ลากเลื้อย', 'ยิงประตู'],
    dimensions: { width: 1200, height: 1800 }
  },
  // Barcelona
  {
    id: 'img-10',
    teamId: 'barcelona',
    playerName: 'ลามีน ยามาล',
    urls: {
      thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=1200&fit=crop',
      full: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=1800&fit=crop'
    },
    type: 'cutout',
    tags: ['ปีก', 'ดาวรุ่ง', 'วัย 16'],
    dimensions: { width: 1200, height: 1800 }
  }
];

// Helper functions
export const getTeamById = (teamId) => teams.find(t => t.id === teamId);
export const getLeagueById = (leagueId) => leagues.find(l => l.id === leagueId);
export const getImagesByTeam = (teamId) => images.filter(img => img.teamId === teamId);
export const getTeamsByLeague = (leagueId) => teams.filter(t => t.leagueId === leagueId);
