const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://classic-e8ab7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

// โลโก้ที่เชื่อถือได้จากแหล่งต่างๆ
const allTeamLogos = {
  // Premier League (20) - จาก Premier League Official
  "manchester-united": "https://resources.premierleague.com/premierleague/badges/50/t1@x2.png",
  "manchester-city": "https://resources.premierleague.com/premierleague/badges/50/t43@x2.png",
  "liverpool": "https://resources.premierleague.com/premierleague/badges/50/t14@x2.png",
  "arsenal": "https://resources.premierleague.com/premierleague/badges/50/t3@x2.png",
  "chelsea": "https://resources.premierleague.com/premierleague/badges/50/t8@x2.png",
  "tottenham": "https://resources.premierleague.com/premierleague/badges/50/t6@x2.png",
  "newcastle": "https://resources.premierleague.com/premierleague/badges/50/t4@x2.png",
  "aston-villa": "https://resources.premierleague.com/premierleague/badges/50/t7@x2.png",
  "brighton": "https://resources.premierleague.com/premierleague/badges/50/t36@x2.png",
  "west-ham": "https://resources.premierleague.com/premierleague/badges/50/t21@x2.png",
  "crystal-palace": "https://resources.premierleague.com/premierleague/badges/50/t31@x2.png",
  "brentford": "https://resources.premierleague.com/premierleague/badges/50/t94@x2.png",
  "fulham": "https://resources.premierleague.com/premierleague/badges/50/t54@x2.png",
  "everton": "https://resources.premierleague.com/premierleague/badges/50/t11@x2.png",
  "nottingham-forest": "https://resources.premierleague.com/premierleague/badges/50/t17@x2.png",
  "bournemouth": "https://resources.premierleague.com/premierleague/badges/50/t91@x2.png",
  "wolves": "https://resources.premierleague.com/premierleague/badges/50/t39@x2.png",
  "ipswich": "https://resources.premierleague.com/premierleague/badges/50/t40@x2.png",
  "leicester": "https://resources.premierleague.com/premierleague/badges/50/t13@x2.png",
  "southampton": "https://resources.premierleague.com/premierleague/badges/50/t20@x2.png",

  // La Liga (20) - จาก secure.espn.com
  "real-madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
  "barcelona": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
  "atletico-madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
  "sevilla": "https://a.espncdn.com/i/teamlogos/soccer/500/283.png",
  "real-sociedad": "https://a.espncdn.com/i/teamlogos/soccer/500/278.png",
  "villarreal": "https://a.espncdn.com/i/teamlogos/soccer/500/102.png",
  "real-betis": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
  "athletic-bilbao": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
  "valencia": "https://a.espncdn.com/i/teamlogos/soccer/500/94.png",
  "celta-vigo": "https://a.espncdn.com/i/teamlogos/soccer/500/85.png",
  "getafe": "https://a.espncdn.com/i/teamlogos/soccer/500/145.png",
  "osasuna": "https://a.espncdn.com/i/teamlogos/soccer/500/173.png",
  "espanyol": "https://a.espncdn.com/i/teamlogos/soccer/500/88.png",
  "rayo-vallecano": "https://a.espncdn.com/i/teamlogos/soccer/500/384.png",
  "las-palmas": "https://a.espncdn.com/i/teamlogos/soccer/500/98.png",
  "leganes": "https://a.espncdn.com/i/teamlogos/soccer/500/175.png",
  "mallorca": "https://a.espncdn.com/i/teamlogos/soccer/500/84.png",
  "alaves": "https://a.espncdn.com/i/teamlogos/soccer/500/78.png",
  "girona": "https://a.espncdn.com/i/teamlogos/soccer/500/401.png",
  "valladolid": "https://a.espncdn.com/i/teamlogos/soccer/500/192.png",

  // Serie A (20)
  "juventus": "https://a.espncdn.com/i/teamlogos/soccer/500/111.png",
  "ac-milan": "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
  "inter-milan": "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
  "napoli": "https://a.espncdn.com/i/teamlogos/soccer/500/114.png",
  "roma": "https://a.espncdn.com/i/teamlogos/soccer/500/115.png",
  "lazio": "https://a.espncdn.com/i/teamlogos/soccer/500/109.png",
  "atalanta": "https://a.espncdn.com/i/teamlogos/soccer/500/105.png",
  "fiorentina": "https://a.espncdn.com/i/teamlogos/soccer/500/107.png",
  "bologna": "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
  "torino": "https://a.espncdn.com/i/teamlogos/soccer/500/120.png",
  "udinese": "https://a.espncdn.com/i/teamlogos/soccer/500/123.png",
  "monza": "https://a.espncdn.com/i/teamlogos/soccer/500/400.png",
  "genoa": "https://a.espncdn.com/i/teamlogos/soccer/500/108.png",
  "sassuolo": "https://a.espncdn.com/i/teamlogos/soccer/500/119.png",
  "empoli": "https://a.espncdn.com/i/teamlogos/soccer/500/106.png",
  "salernitana": "https://a.espncdn.com/i/teamlogos/soccer/500/399.png",
  "lecce": "https://a.espncdn.com/i/teamlogos/soccer/500/112.png",
  "verona": "https://a.espncdn.com/i/teamlogos/soccer/500/127.png",
  "cagliari": "https://a.espncdn.com/i/teamlogos/soccer/500/2925.png",
  "frosinone": "https://a.espncdn.com/i/teamlogos/soccer/500/3819.png",

  // Bundesliga (18)
  "bayern-munich": "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
  "borussia-dortmund": "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
  "bayer-leverkusen": "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
  "rb-leipzig": "https://a.espncdn.com/i/teamlogos/soccer/500/136.png",
  "eintracht-frankfurt": "https://a.espncdn.com/i/teamlogos/soccer/500/125.png",
  "wolfsburg": "https://a.espncdn.com/i/teamlogos/soccer/500/138.png",
  "freiburg": "https://a.espncdn.com/i/teamlogos/soccer/500/126.png",
  "union-berlin": "https://a.espncdn.com/i/teamlogos/soccer/500/3950.png",
  "borussia-mgladbach": "https://a.espncdn.com/i/teamlogos/soccer/500/133.png",
  "stuttgart": "https://a.espncdn.com/i/teamlogos/soccer/500/134.png",
  "augsburg": "https://a.espncdn.com/i/teamlogos/soccer/500/129.png",
  "werder-bremen": "https://a.espncdn.com/i/teamlogos/soccer/500/137.png",
  "hoffenheim": "https://a.espncdn.com/i/teamlogos/soccer/500/130.png",
  "heidenheim": "https://a.espncdn.com/i/teamlogos/soccer/500/139.png",
  "mainz": "https://a.espncdn.com/i/teamlogos/soccer/500/135.png",
  "bochum": "https://a.espncdn.com/i/teamlogos/soccer/500/3813.png",
  "darmstadt": "https://a.espncdn.com/i/teamlogos/soccer/500/1451.png",
  "cologne": "https://a.espncdn.com/i/teamlogos/soccer/500/128.png",

  // Ligue 1 (18)
  "psg": "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
  "marseille": "https://a.espncdn.com/i/teamlogos/soccer/500/159.png",
  "monaco": "https://a.espncdn.com/i/teamlogos/soccer/500/167.png",
  "lille": "https://a.espncdn.com/i/teamlogos/soccer/500/162.png",
  "lyon": "https://a.espncdn.com/i/teamlogos/soccer/500/166.png",
  "rennes": "https://a.espncdn.com/i/teamlogos/soccer/500/169.png",
  "nice": "https://a.espncdn.com/i/teamlogos/soccer/500/164.png",
  "reims": "https://a.espncdn.com/i/teamlogos/soccer/500/168.png",
  "lens": "https://a.espncdn.com/i/teamlogos/soccer/500/1647.png",
  "montpellier": "https://a.espncdn.com/i/teamlogos/soccer/500/165.png",
  "strasbourg": "https://a.espncdn.com/i/teamlogos/soccer/500/171.png",
  "nantes": "https://a.espncdn.com/i/teamlogos/soccer/500/163.png",
  "toulouse": "https://a.espncdn.com/i/teamlogos/soccer/500/170.png",
  "le-havre": "https://a.espncdn.com/i/teamlogos/soccer/500/161.png",
  "brest": "https://a.espncdn.com/i/teamlogos/soccer/500/2105.png",
  "metz": "https://a.espncdn.com/i/teamlogos/soccer/500/172.png",
  "lorient": "https://a.espncdn.com/i/teamlogos/soccer/500/1619.png",
  "clermont": "https://a.espncdn.com/i/teamlogos/soccer/500/3818.png"
};

async function updateAllTeamLogos() {
  console.log('🔄 เริ่มอัปเดตโลโก้ทีมทั้งหมด...\n');
  
  let updatedCount = 0;
  let errorCount = 0;
  let notFoundCount = 0;
  
  for (const [teamId, logoUrl] of Object.entries(allTeamLogos)) {
    try {
      const teamRef = db.collection('teams').doc(teamId);
      const doc = await teamRef.get();
      
      if (doc.exists) {
        await teamRef.update({ logo: logoUrl });
        console.log(`✅ ${teamId}`);
        updatedCount++;
      } else {
        console.log(`⚠️  ไม่พบทีม: ${teamId}`);
        notFoundCount++;
      }
    } catch (error) {
      console.error(`❌ ${teamId}: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n📊 สรุป:`);
  console.log(`   ✅ อัปเดตสำเร็จ: ${updatedCount} ทีม`);
  console.log(`   ⚠️  ไม่พบทีม: ${notFoundCount} ทีม`);
  console.log(`   ❌ ผิดพลาด: ${errorCount} ทีม`);
  console.log(`\n🏁 รวมทั้งหมด: ${updatedCount + notFoundCount + errorCount} ทีม`);
  
  process.exit(0);
}

updateAllTeamLogos();
