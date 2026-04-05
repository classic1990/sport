const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://classic-e8ab7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

// โลโก้สำรองจากแหล่งอื่น (PNG แทน SVG)
const backupLogos = {
  // Premier League
  "manchester-united": "https://resources.premierleague.com/premierleague/badges/t1.png",
  "manchester-city": "https://resources.premierleague.com/premierleague/badges/t43.png",
  "liverpool": "https://resources.premierleague.com/premierleague/badges/t14.png",
  "arsenal": "https://resources.premierleague.com/premierleague/badges/t3.png",
  "chelsea": "https://resources.premierleague.com/premierleague/badges/t8.png",
  "tottenham": "https://resources.premierleague.com/premierleague/badges/t6.png",
  "newcastle": "https://resources.premierleague.com/premierleague/badges/t4.png",
  "aston-villa": "https://resources.premierleague.com/premierleague/badges/t7.png",
  "brighton": "https://resources.premierleague.com/premierleague/badges/t36.png",
  "west-ham": "https://resources.premierleague.com/premierleague/badges/t21.png",
  "crystal-palace": "https://resources.premierleague.com/premierleague/badges/t31.png",
  "brentford": "https://resources.premierleague.com/premierleague/badges/t94.png",
  "fulham": "https://resources.premierleague.com/premierleague/badges/t54.png",
  "everton": "https://resources.premierleague.com/premierleague/badges/t11.png",
  "nottingham-forest": "https://resources.premierleague.com/premierleague/badges/t17.png",
  "bournemouth": "https://resources.premierleague.com/premierleague/badges/t91.png",
  "wolves": "https://resources.premierleague.com/premierleague/badges/t39.png",
  "ipswich": "https://resources.premierleague.com/premierleague/badges/t40.png",
  "leicester": "https://resources.premierleague.com/premierleague/badges/t13.png",
  "southampton": "https://resources.premierleague.com/premierleague/badges/t20.png",
};

async function updateToBackupLogos() {
  console.log('🔄 กำลังอัปเดตโลโก้เป็นแหล่งสำรอง...');
  
  let updated = 0;
  
  for (const [teamId, logoUrl] of Object.entries(backupLogos)) {
    try {
      await db.collection('teams').doc(teamId).update({ logo: logoUrl });
      console.log(`✅ ${teamId}: ${logoUrl}`);
      updated++;
    } catch (error) {
      console.error(`❌ ${teamId}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 อัปเดตสำเร็จ ${updated} ทีม`);
  process.exit(0);
}

updateToBackupLogos();
