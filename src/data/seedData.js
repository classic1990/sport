// ข้อมูลเริ่มต้นสำหรับ Firebase Firestore
// นำไปใช้โดยรันคำสั่งใน Firebase Console หรือสร้าง Cloud Function

const initialData = {
  // Collection: leagues
  leagues: [
    {
      id: "premier-league",
      name: "Premier League",
      thaiName: "พรีเมียร์ลีก",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png",
      country: "England",
      order: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: "laliga",
      name: "La Liga",
      thaiName: "ลาลีกา",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png",
      country: "Spain",
      order: 2,
      createdAt: new Date().toISOString()
    },
    {
      id: "serie-a",
      name: "Serie A",
      thaiName: "กัลโช่ เซเรีย อา",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/1200px-Serie_A_logo_2022.svg.png",
      country: "Italy",
      order: 3,
      createdAt: new Date().toISOString()
    },
    {
      id: "bundesliga",
      name: "Bundesliga",
      thaiName: "บุนเดสลีกา",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png",
      country: "Germany",
      order: 4,
      createdAt: new Date().toISOString()
    }
  ],

  // Collection: teams
  teams: [
    // Premier League
    {
      id: "manchester-united",
      leagueId: "premier-league",
      name: "Manchester United",
      thaiName: "แมนเชสเตอร์ ยูไนเต็ด",
      shortName: "MUN",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
      colors: { primary: "#DA291C", secondary: "#000000" },
      gradient: "from-red-600 to-black",
      textGlow: "text-red-500",
      createdAt: new Date().toISOString()
    },
    {
      id: "manchester-city",
      leagueId: "premier-league",
      name: "Manchester City",
      thaiName: "แมนเชสเตอร์ ซิตี้",
      shortName: "MCI",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
      colors: { primary: "#6CABDD", secondary: "#FFFFFF" },
      gradient: "from-blue-400 to-blue-700",
      textGlow: "text-blue-400",
      createdAt: new Date().toISOString()
    },
    {
      id: "liverpool",
      leagueId: "premier-league",
      name: "Liverpool",
      thaiName: "ลิเวอร์พูล",
      shortName: "LIV",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
      colors: { primary: "#C8102E", secondary: "#00B2A9" },
      gradient: "from-red-600 to-red-900",
      textGlow: "text-red-500",
      createdAt: new Date().toISOString()
    },
    {
      id: "arsenal",
      leagueId: "premier-league",
      name: "Arsenal",
      thaiName: "อาร์เซนอล",
      shortName: "ARS",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
      colors: { primary: "#EF0107", secondary: "#FFFFFF" },
      gradient: "from-red-500 to-red-800",
      textGlow: "text-red-400",
      createdAt: new Date().toISOString()
    },
    {
      id: "chelsea",
      leagueId: "premier-league",
      name: "Chelsea",
      thaiName: "เชลซี",
      shortName: "CHE",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
      colors: { primary: "#034694", secondary: "#FFFFFF" },
      gradient: "from-blue-700 to-blue-900",
      textGlow: "text-blue-500",
      createdAt: new Date().toISOString()
    },
    {
      id: "tottenham",
      leagueId: "premier-league",
      name: "Tottenham Hotspur",
      thaiName: "ท็อตแน่ม ฮ็อทสเปอร์",
      shortName: "TOT",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png",
      colors: { primary: "#FFFFFF", secondary: "#132257" },
      gradient: "from-gray-100 to-gray-400",
      textGlow: "text-white",
      createdAt: new Date().toISOString()
    },
    // La Liga
    {
      id: "real-madrid",
      leagueId: "laliga",
      name: "Real Madrid",
      thaiName: "เรอัล มาดริด",
      shortName: "RMA",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
      colors: { primary: "#FFFFFF", secondary: "#FEBE10" },
      gradient: "from-yellow-400 to-yellow-600",
      textGlow: "text-yellow-400",
      createdAt: new Date().toISOString()
    },
    {
      id: "barcelona",
      leagueId: "laliga",
      name: "Barcelona",
      thaiName: "บาร์เซโลน่า",
      shortName: "BAR",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
      colors: { primary: "#A50044", secondary: "#004D98" },
      gradient: "from-blue-600 to-red-600",
      textGlow: "text-blue-400",
      createdAt: new Date().toISOString()
    }
  ],

  // Collection: images
  images: [
    {
      id: "img-1",
      teamId: "manchester-united",
      playerName: "บรูโน่ แฟร์นันด์ส",
      urls: {
        thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=600&fit=crop",
        preview: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1200&fit=crop",
        full: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=1800&fit=crop"
      },
      type: "cutout",
      tags: ["กองกลาง", "กัปตัน", "ดีใจ"],
      dimensions: { width: 1200, height: 1800 },
      downloadCount: 150,
      createdAt: new Date().toISOString()
    },
    {
      id: "img-2",
      teamId: "manchester-united",
      playerName: "มาร์คัส แรชฟอร์ด",
      urls: {
        thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop",
        preview: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=1200&fit=crop",
        full: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&h=1800&fit=crop"
      },
      type: "cutout",
      tags: ["กองหน้า", "ยิงประตู", "วิ่ง"],
      dimensions: { width: 1200, height: 1800 },
      downloadCount: 230,
      createdAt: new Date().toISOString()
    },
    {
      id: "img-3",
      teamId: "manchester-united",
      playerName: "อเลฮานโดร การ์นาโช่",
      urls: {
        thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=600&fit=crop",
        preview: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=1200&fit=crop",
        full: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=1800&fit=crop"
      },
      type: "cutout",
      tags: ["กองหน้า", "แอ็คชั่น", "ปีก"],
      dimensions: { width: 1200, height: 1800 },
      downloadCount: 180,
      createdAt: new Date().toISOString()
    }
  ]
};

// วิธีใช้: ไปที่ Firebase Console > Firestore Database > สร้าง Collections ตามด้านบน
// หรือใช้ Firebase CLI: firebase firestore:import initialData.json

export default initialData;
