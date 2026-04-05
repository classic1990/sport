/**
 * Update team logos in Firestore to use reliable CDN (API-Football)
 * Run: node scripts/updateLogos.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://classic-e8ab7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

// API-Football CDN - allows hotlinking, reliable
const logoMapping = {
  // Premier League
  "manchester-united": "https://media.api-sports.io/football/teams/33.png",
  "manchester-city": "https://media.api-sports.io/football/teams/50.png",
  "liverpool": "https://media.api-sports.io/football/teams/40.png",
  "arsenal": "https://media.api-sports.io/football/teams/42.png",
  "chelsea": "https://media.api-sports.io/football/teams/49.png",
  "tottenham": "https://media.api-sports.io/football/teams/47.png",
  "newcastle": "https://media.api-sports.io/football/teams/34.png",
  "aston-villa": "https://media.api-sports.io/football/teams/66.png",
  "brighton": "https://media.api-sports.io/football/teams/51.png",
  "west-ham": "https://media.api-sports.io/football/teams/48.png",
  "crystal-palace": "https://media.api-sports.io/football/teams/52.png",
  "brentford": "https://media.api-sports.io/football/teams/55.png",
  "fulham": "https://media.api-sports.io/football/teams/36.png",
  "everton": "https://media.api-sports.io/football/teams/45.png",
  "nottingham-forest": "https://media.api-sports.io/football/teams/65.png",
  "bournemouth": "https://media.api-sports.io/football/teams/35.png",
  "wolves": "https://media.api-sports.io/football/teams/39.png",
  "ipswich": "https://media.api-sports.io/football/teams/1359.png",
  "leicester": "https://media.api-sports.io/football/teams/46.png",
  "southampton": "https://media.api-sports.io/football/teams/41.png",

  // La Liga
  "real-madrid": "https://media.api-sports.io/football/teams/541.png",
  "barcelona": "https://media.api-sports.io/football/teams/529.png",
  "atletico-madrid": "https://media.api-sports.io/football/teams/530.png",
  "sevilla": "https://media.api-sports.io/football/teams/536.png",
  "real-sociedad": "https://media.api-sports.io/football/teams/548.png",
  "villarreal": "https://media.api-sports.io/football/teams/533.png",
  "real-betis": "https://media.api-sports.io/football/teams/543.png",
  "athletic-bilbao": "https://media.api-sports.io/football/teams/531.png",
  "valencia": "https://media.api-sports.io/football/teams/532.png",
  "celta-vigo": "https://media.api-sports.io/football/teams/538.png",
  "getafe": "https://media.api-sports.io/football/teams/546.png",
  "osasuna": "https://media.api-sports.io/football/teams/727.png",
  "espanyol": "https://media.api-sports.io/football/teams/540.png",
  "rayo-vallecano": "https://media.api-sports.io/football/teams/728.png",
  "las-palmas": "https://media.api-sports.io/football/teams/534.png",
  "leganes": "https://media.api-sports.io/football/teams/537.png",
  "mallorca": "https://media.api-sports.io/football/teams/798.png",
  "alaves": "https://media.api-sports.io/football/teams/542.png",
  "girona": "https://media.api-sports.io/football/teams/547.png",
  "valladolid": "https://media.api-sports.io/football/teams/720.png",

  // Serie A
  "juventus": "https://media.api-sports.io/football/teams/496.png",
  "ac-milan": "https://media.api-sports.io/football/teams/489.png",
  "inter-milan": "https://media.api-sports.io/football/teams/505.png",
  "napoli": "https://media.api-sports.io/football/teams/492.png",
  "roma": "https://media.api-sports.io/football/teams/497.png",
  "lazio": "https://media.api-sports.io/football/teams/487.png",
  "atalanta": "https://media.api-sports.io/football/teams/499.png",
  "fiorentina": "https://media.api-sports.io/football/teams/502.png",
  "bologna": "https://media.api-sports.io/football/teams/500.png",
  "torino": "https://media.api-sports.io/football/teams/503.png",
  "udinese": "https://media.api-sports.io/football/teams/494.png",
  "monza": "https://media.api-sports.io/football/teams/1579.png",
  "genoa": "https://media.api-sports.io/football/teams/495.png",
  "sassuolo": "https://media.api-sports.io/football/teams/488.png",
  "empoli": "https://media.api-sports.io/football/teams/511.png",
  "salernitana": "https://media.api-sports.io/football/teams/514.png",
  "lecce": "https://media.api-sports.io/football/teams/867.png",
  "verona": "https://media.api-sports.io/football/teams/504.png",
  "cagliari": "https://media.api-sports.io/football/teams/490.png",
  "frosinone": "https://media.api-sports.io/football/teams/512.png",

  // Bundesliga
  "bayern-munich": "https://media.api-sports.io/football/teams/157.png",
  "borussia-dortmund": "https://media.api-sports.io/football/teams/165.png",
  "bayer-leverkusen": "https://media.api-sports.io/football/teams/168.png",
  "rb-leipzig": "https://media.api-sports.io/football/teams/173.png",
  "eintracht-frankfurt": "https://media.api-sports.io/football/teams/169.png",
  "wolfsburg": "https://media.api-sports.io/football/teams/161.png",
  "freiburg": "https://media.api-sports.io/football/teams/160.png",
  "union-berlin": "https://media.api-sports.io/football/teams/182.png",
  "borussia-mgladbach": "https://media.api-sports.io/football/teams/163.png",
  "stuttgart": "https://media.api-sports.io/football/teams/164.png",
  "augsburg": "https://media.api-sports.io/football/teams/170.png",
  "werder-bremen": "https://media.api-sports.io/football/teams/162.png",
  "hoffenheim": "https://media.api-sports.io/football/teams/166.png",
  "heidenheim": "https://media.api-sports.io/football/teams/180.png",
  "mainz": "https://media.api-sports.io/football/teams/167.png",
  "bochum": "https://media.api-sports.io/football/teams/176.png",
  "darmstadt": "https://media.api-sports.io/football/teams/181.png",
  "cologne": "https://media.api-sports.io/football/teams/192.png",

  // Ligue 1
  "psg": "https://media.api-sports.io/football/teams/85.png",
  "marseille": "https://media.api-sports.io/football/teams/81.png",
  "monaco": "https://media.api-sports.io/football/teams/91.png",
  "lille": "https://media.api-sports.io/football/teams/79.png",
  "lyon": "https://media.api-sports.io/football/teams/80.png",
  "rennes": "https://media.api-sports.io/football/teams/94.png",
  "nice": "https://media.api-sports.io/football/teams/84.png",
  "reims": "https://media.api-sports.io/football/teams/93.png",
  "lens": "https://media.api-sports.io/football/teams/93.png",
  "montpellier": "https://media.api-sports.io/football/teams/82.png",
  "strasbourg": "https://media.api-sports.io/football/teams/95.png",
  "nantes": "https://media.api-sports.io/football/teams/83.png",
  "toulouse": "https://media.api-sports.io/football/teams/96.png",
  "le-havre": "https://media.api-sports.io/football/teams/89.png",
  "brest": "https://media.api-sports.io/football/teams/106.png",
  "metz": "https://media.api-sports.io/football/teams/98.png",
  "lorient": "https://media.api-sports.io/football/teams/97.png",
  "clermont": "https://media.api-sports.io/football/teams/99.png"
};

const leagueLogos = {
  "premier-league": "https://media.api-sports.io/football/leagues/39.png",
  "laliga": "https://media.api-sports.io/football/leagues/140.png",
  "serie-a": "https://media.api-sports.io/football/leagues/135.png",
  "bundesliga": "https://media.api-sports.io/football/leagues/78.png",
  "ligue-1": "https://media.api-sports.io/football/leagues/61.png"
};

async function updateLogos() {
  console.log('🔄 กำลังอัพเดทโลโก้ใน Firestore...\n');
  
  let updated = 0;
  let failed = 0;

  // Update teams
  const teamsSnapshot = await db.collection('teams').get();
  
  for (const doc of teamsSnapshot.docs) {
    const teamId = doc.id;
    const newLogo = logoMapping[teamId];
    
    if (newLogo) {
      try {
        await doc.ref.update({ logo: newLogo });
        console.log(`  ✅ ${teamId}`);
        updated++;
      } catch (err) {
        console.log(`  ❌ ${teamId}: ${err.message}`);
        failed++;
      }
    }
  }

  // Update leagues
  const leaguesSnapshot = await db.collection('leagues').get();
  
  for (const doc of leaguesSnapshot.docs) {
    const leagueId = doc.id;
    const newLogo = leagueLogos[leagueId];
    
    if (newLogo) {
      try {
        await doc.ref.update({ logo: newLogo });
        console.log(`  ✅ ${leagueId} (league)`);
        updated++;
      } catch (err) {
        console.log(`  ❌ ${leagueId}: ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\n📊 สรุป: ${updated} อัพเดทสำเร็จ, ${failed} ล้มเหลว`);
  console.log('🎉 โลโก้ทีมอัพเดทเรียบร้อย!');
  process.exit(0);
}

updateLogos().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
