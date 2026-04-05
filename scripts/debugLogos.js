const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://classic-e8ab7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

async function debugMissingLogos() {
  console.log('🔍 กำลังตรวจสอบทีมที่ไม่มีโลโก้...\n');
  
  const teamsSnapshot = await db.collection('teams').get();
  const leaguesSnapshot = await db.collection('leagues').get();
  
  const missingTeamLogos = [];
  const missingLeagueLogos = [];
  
  // ตรวจสอบทีม
  teamsSnapshot.forEach(doc => {
    const data = doc.data();
    if (!data.logo || data.logo === '' || data.logo.includes('placeholder')) {
      missingTeamLogos.push({
        id: doc.id,
        name: data.name,
        thaiName: data.thaiName,
        shortName: data.shortName,
        currentLogo: data.logo || 'ไม่มี'
      });
    }
  });
  
  // ตรวจสอบลีก
  leaguesSnapshot.forEach(doc => {
    const data = doc.data();
    if (!data.logo || data.logo === '') {
      missingLeagueLogos.push({
        id: doc.id,
        name: data.name,
        thaiName: data.thaiName
      });
    }
  });
  
  console.log('📊 ผลการตรวจสอบ:\n');
  
  if (missingTeamLogos.length > 0) {
    console.log(`❌ ทีมที่ไม่มีโลโก้ (${missingTeamLogos.length} ทีม):`);
    missingTeamLogos.forEach(team => {
      console.log(`   - ${team.id} (${team.thaiName || team.name}) [${team.shortName}]`);
      console.log(`     โลโก้ปัจจุบัน: ${team.currentLogo}`);
    });
  } else {
    console.log('✅ ทุกทีมมีโลโก้ครบถ้วน');
  }
  
  console.log('');
  
  if (missingLeagueLogos.length > 0) {
    console.log(`❌ ลีกที่ไม่มีโลโก้ (${missingLeagueLogos.length} ลีก):`);
    missingLeagueLogos.forEach(league => {
      console.log(`   - ${league.id} (${league.thaiName || league.name})`);
    });
  } else {
    console.log('✅ ทุกลีกมีโลโก้ครบถ้วน');
  }
  
  process.exit(0);
}

debugMissingLogos();
