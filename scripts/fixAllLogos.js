const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://classic-e8ab7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

// โลโก้จากแหล่งที่แน่นอน (PNG เท่านั้น)
const reliableLogos = {
  // Premier League - from football-data.org
  "manchester-united": "https://crests.football-data.org/66.png",
  "manchester-city": "https://crests.football-data.org/65.png",
  "liverpool": "https://crests.football-data.org/64.png",
  "arsenal": "https://crests.football-data.org/57.png",
  "chelsea": "https://crests.football-data.org/61.png",
  "tottenham": "https://crests.football-data.org/73.png",
  "newcastle": "https://crests.football-data.org/67.png",
  "aston-villa": "https://crests.football-data.org/58.png",
  "brighton": "https://crests.football-data.org/397.png",
  "west-ham": "https://crests.football-data.org/563.png",
  "crystal-palace": "https://crests.football-data.org/354.png",
  "brentford": "https://crests.football-data.org/402.png",
  "fulham": "https://crests.football-data.org/63.png",
  "everton": "https://crests.football-data.org/62.png",
  "nottingham-forest": "https://crests.football-data.org/351.png",
  "bournemouth": "https://crests.football-data.org/1044.png",
  "wolves": "https://crests.football-data.org/76.png",
  "ipswich": "https://crests.football-data.org/349.png",
  "leicester": "https://crests.football-data.org/338.png",
  "southampton": "https://crests.football-data.org/340.png",

  // La Liga
  "real-madrid": "https://crests.football-data.org/86.png",
  "barcelona": "https://crests.football-data.org/81.png",
  "atletico-madrid": "https://crests.football-data.org/78.png",
  "sevilla": "https://crests.football-data.org/559.png",
  "real-sociedad": "https://crests.football-data.org/92.png",
  "villarreal": "https://crests.football-data.org/94.png",
  "real-betis": "https://crests.football-data.org/90.png",
  "athletic-bilbao": "https://crests.football-data.org/77.png",
  "valencia": "https://crests.football-data.org/95.png",
  "celta-vigo": "https://crests.football-data.org/558.png",
  "getafe": "https://crests.football-data.org/82.png",
  "osasuna": "https://crests.football-data.org/79.png",
  "espanyol": "https://crests.football-data.org/80.png",
  "rayo-vallecano": "https://crests.football-data.org/87.png",
  "las-palmas": "https://crests.football-data.org/83.png",
  "leganes": "https://crests.football-data.org/84.png",
  "mallorca": "https://crests.football-data.org/89.png",
  "alaves": "https://crests.football-data.org/263.png",
  "girona": "https://crests.football-data.org/547.png",
  "valladolid": "https://crests.football-data.org/720.png",

  // Serie A
  "juventus": "https://crests.football-data.org/109.png",
  "ac-milan": "https://crests.football-data.org/99.png",
  "inter-milan": "https://crests.football-data.org/108.png",
  "napoli": "https://crests.football-data.org/113.png",
  "roma": "https://crests.football-data.org/100.png",
  "lazio": "https://crests.football-data.org/110.png",
  "atalanta": "https://crests.football-data.org/102.png",
  "fiorentina": "https://crests.football-data.org/99.png",
  "bologna": "https://crests.football-data.org/103.png",
  "torino": "https://crests.football-data.org/586.png",
  "udinese": "https://crests.football-data.org/115.png",
  "monza": "https://crests.football-data.org/505.png",
  "genoa": "https://crests.football-data.org/107.png",
  "sassuolo": "https://crests.football-data.org/471.png",
  "empoli": "https://crests.football-data.org/445.png",
  "salernitana": "https://crests.football-data.org/455.png",
  "lecce": "https://crests.football-data.org/589.png",
  "verona": "https://crests.football-data.org/450.png",
  "cagliari": "https://crests.football-data.org/104.png",
  "frosinone": "https://crests.football-data.org/470.png",

  // Bundesliga
  "bayern-munich": "https://crests.football-data.org/5.png",
  "borussia-dortmund": "https://crests.football-data.org/4.png",
  "bayer-leverkusen": "https://crests.football-data.org/3.png",
  "rb-leipzig": "https://crests.football-data.org/721.png",
  "eintracht-frankfurt": "https://crests.football-data.org/19.png",
  "wolfsburg": "https://crests.football-data.org/11.png",
  "freiburg": "https://crests.football-data.org/17.png",
  "union-berlin": "https://crests.football-data.org/28.png",
  "borussia-mgladbach": "https://crests.football-data.org/18.png",
  "stuttgart": "https://crests.football-data.org/10.png",
  "augsburg": "https://crests.football-data.org/16.png",
  "werder-bremen": "https://crests.football-data.org/12.png",
  "hoffenheim": "https://crests.football-data.org/2.png",
  "heidenheim": "https://crests.football-data.org/44.png",
  "mainz": "https://crests.football-data.org/15.png",
  "bochum": "https://crests.football-data.org/36.png",
  "darmstadt": "https://crests.football-data.org/55.png",
  "cologne": "https://crests.football-data.org/1.png",

  // Ligue 1
  "psg": "https://crests.football-data.org/524.png",
  "marseille": "https://crests.football-data.org/516.png",
  "monaco": "https://crests.football-data.org/548.png",
  "lille": "https://crests.football-data.org/521.png",
  "lyon": "https://crests.football-data.org/523.png",
  "rennes": "https://crests.football-data.org/529.png",
  "nice": "https://crests.football-data.org/522.png",
  "reims": "https://crests.football-data.org/547.png",
  "lens": "https://crests.football-data.org/511.png",
  "montpellier": "https://crests.football-data.org/518.png",
  "strasbourg": "https://crests.football-data.org/548.png",
  "nantes": "https://crests.football-data.org/543.png",
  "toulouse": "https://crests.football-data.org/511.png",
  "le-havre": "https://crests.football-data.org/513.png",
  "brest": "https://crests.football-data.org/512.png",
  "metz": "https://crests.football-data.org/515.png",
  "lorient": "https://crests.football-data.org/514.png",
  "clermont": "https://crests.football-data.org/541.png"
};

// โลโก้ลีกที่เชื่อถือได้
const leagueLogos = {
  "premier-league": "https://crests.football-data.org/PL.png",
  "laliga": "https://crests.football-data.org/PD.png",
  "serie-a": "https://crests.football-data.org/SA.png",
  "bundesliga": "https://crests.football-data.org/BL1.png",
  "ligue-1": "https://crests.football-data.org/FL1.png"
};

async function fixAllLogos() {
  console.log('🔄 กำลังอัปเดตโลโก้ทั้งหมดด้วยแหล่งที่เชื่อถือได้...\n');
  
  let updatedTeams = 0;
  let updatedLeagues = 0;
  
  // อัปเดตทีม
  for (const [teamId, logoUrl] of Object.entries(reliableLogos)) {
    try {
      await db.collection('teams').doc(teamId).update({ logo: logoUrl });
      console.log(`✅ ทีม: ${teamId}`);
      updatedTeams++;
    } catch (error) {
      console.error(`❌ ทีม ${teamId}: ${error.message}`);
    }
  }
  
  // อัปเดตลีก
  for (const [leagueId, logoUrl] of Object.entries(leagueLogos)) {
    try {
      await db.collection('leagues').doc(leagueId).update({ logo: logoUrl });
      console.log(`✅ ลีก: ${leagueId}`);
      updatedLeagues++;
    } catch (error) {
      console.error(`❌ ลีก ${leagueId}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 สรุป:`);
  console.log(`   ✅ อัปเดตทีม: ${updatedTeams} ทีม`);
  console.log(`   ✅ อัปเดตลีก: ${updatedLeagues} ลีก`);
  
  process.exit(0);
}

fixAllLogos();
