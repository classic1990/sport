#!/usr/bin/env node
/**
 * Download team logos from Wikipedia
 * Run: node scripts/downloadLogos.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(__dirname, '..', 'public', 'logos');

// Ensure directory exists
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const teams = [
  // Premier League (20)
  { id: "manchester-united", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
  { id: "manchester-city", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
  { id: "liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
  { id: "arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
  { id: "chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
  { id: "tottenham", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" },
  { id: "newcastle", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg" },
  { id: "aston-villa", logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg" },
  { id: "brighton", logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg" },
  { id: "west-ham", logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg" },
  { id: "crystal-palace", logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg" },
  { id: "brentford", logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg" },
  { id: "fulham", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg" },
  { id: "everton", logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg" },
  { id: "nottingham-forest", logo: "https://upload.wikimedia.org/wikipedia/en/d/d2/Nottingham_Forest_F.C._logo.svg" },
  { id: "bournemouth", logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/AFC_Bournemouth_%282013%29.svg" },
  { id: "wolves", logo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg" },
  { id: "ipswich", logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg" },
  { id: "leicester", logo: "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg" },
  { id: "southampton", logo: "https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg" },

  // La Liga (20)
  { id: "real-madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { id: "barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
  { id: "atletico-madrid", logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Atletico_Madrid_2017_logo.svg" },
  { id: "sevilla", logo: "https://upload.wikimedia.org/wikipedia/en/5/58/Sevilla_FC_logo.svg" },
  { id: "real-sociedad", logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg" },
  { id: "villarreal", logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo.svg" },
  { id: "real-betis", logo: "https://upload.wikimedia.org/wikipedia/en/1/13/Real_Betis_logo.svg" },
  { id: "athletic-bilbao", logo: "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg" },
  { id: "valencia", logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg" },
  { id: "celta-vigo", logo: "https://upload.wikimedia.org/wikipedia/en/1/12/RC_Celta_de_Vigo_logo.svg" },
  { id: "getafe", logo: "https://upload.wikimedia.org/wikipedia/en/4/46/Getafe_CF.svg" },
  { id: "osasuna", logo: "https://upload.wikimedia.org/wikipedia/en/0/03/CA_Osasuna_logo.svg" },
  { id: "espanyol", logo: "https://upload.wikimedia.org/wikipedia/en/7/79/RCD_Espanyol_logo.svg" },
  { id: "rayo-vallecano", logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Rayo_Vallecano_logo.svg" },
  { id: "las-palmas", logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/UD_Las_Palmas_logo.svg" },
  { id: "leganes", logo: "https://upload.wikimedia.org/wikipedia/en/6/6d/CD_Legan%C3%A9s_logo.svg" },
  { id: "mallorca", logo: "https://upload.wikimedia.org/wikipedia/en/1/1e/RCD_Mallorca_logo.svg" },
  { id: "alaves", logo: "https://upload.wikimedia.org/wikipedia/en/2/26/Deportivo_Alaves_logo.svg" },
  { id: "girona", logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/Girona_FC.svg" },
  { id: "valladolid", logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/Real_Valladolid_Logo.svg" },

  // Serie A (20)
  { id: "juventus", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg" },
  { id: "ac-milan", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/AC_Milan_logo.svg" },
  { id: "inter-milan", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" },
  { id: "napoli", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli_-_Logo_%282020%29.svg" },
  { id: "roma", logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg" },
  { id: "lazio", logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/SS_Lazio.svg" },
  { id: "atalanta", logo: "https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg" },
  { id: "fiorentina", logo: "https://upload.wikimedia.org/wikipedia/en/6/65/ACF_Fiorentina.svg" },
  { id: "bologna", logo: "https://upload.wikimedia.org/wikipedia/en/5/5b/Bologna_F.C._1909_logo.svg" },
  { id: "torino", logo: "https://upload.wikimedia.org/wikipedia/en/2/2e/Torino_FC_Logo.svg" },
  { id: "udinese", logo: "https://upload.wikimedia.org/wikipedia/en/c/cb/Udinese_Calcio_logo.svg" },
  { id: "monza", logo: "https://upload.wikimedia.org/wikipedia/en/3/36/AC_Monza_logo_%282021%29.svg" },
  { id: "genoa", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Genoa_CFC.svg" },
  { id: "sassuolo", logo: "https://upload.wikimedia.org/wikipedia/en/5/5a/US_Sassuolo_Calcio_logo.svg" },
  { id: "empoli", logo: "https://upload.wikimedia.org/wikipedia/en/6/67/Empoli_FC.svg" },
  { id: "salernitana", logo: "https://upload.wikimedia.org/wikipedia/en/8/8d/US_Salernitana_1919.svg" },
  { id: "lecce", logo: "https://upload.wikimedia.org/wikipedia/en/5/54/US_Lecce.svg" },
  { id: "verona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/Hellas_Verona_FC_logo.svg" },
  { id: "cagliari", logo: "https://upload.wikimedia.org/wikipedia/en/6/61/Cagliari_Calcio_1920.svg" },
  { id: "frosinone", logo: "https://upload.wikimedia.org/wikipedia/en/d/d1/Frosinone_Calcio.svg" },

  // Bundesliga (18)
  { id: "bayern-munich", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
  { id: "borussia-dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
  { id: "bayer-leverkusen", logo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg" },
  { id: "rb-leipzig", logo: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg" },
  { id: "eintracht-frankfurt", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg" },
  { id: "wolfsburg", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/VfL_Wolfsburg_Logo.svg" },
  { id: "freiburg", logo: "https://upload.wikimedia.org/wikipedia/en/6/6d/SC_Freiburg_logo.svg" },
  { id: "union-berlin", logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/1._FC_Union_Berlin_Logo.svg" },
  { id: "borussia-mgladbach", logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_M%C3%B6nchengladbach_logo.svg" },
  { id: "stuttgart", logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg" },
  { id: "augsburg", logo: "https://upload.wikimedia.org/wikipedia/en/c/c5/FC_Augsburg_logo.svg" },
  { id: "werder-bremen", logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/SV-Werder-Bremen-Logo.svg" },
  { id: "hoffenheim", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Logo_TSG_1899_Hoffenheim.svg" },
  { id: "heidenheim", logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/1._FC_Heidenheim_1846.svg" },
  { id: "mainz", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/FSV_Mainz_05_Logo.svg" },
  { id: "bochum", logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/VfL_Bochum_logo.svg" },
  { id: "darmstadt", logo: "https://upload.wikimedia.org/wikipedia/en/9/92/SV_Darmstadt_98.svg" },
  { id: "cologne", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/FC_Cologne_logo.svg" },

  // Ligue 1 (18)
  { id: "psg", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
  { id: "marseille", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Olympique_Marseille_logo.svg" },
  { id: "monaco", logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/AS_Monaco_FC.svg" },
  { id: "lille", logo: "https://upload.wikimedia.org/wikipedia/en/3/3f/Lille_OSC_2018_logo.svg" },
  { id: "lyon", logo: "https://upload.wikimedia.org/wikipedia/en/7/7f/Olympique_Lyonnais.svg" },
  { id: "rennes", logo: "https://upload.wikimedia.org/wikipedia/en/9/9c/Stade_Rennais_FC.svg" },
  { id: "nice", logo: "https://upload.wikimedia.org/wikipedia/en/2/24/OGC_Nice_logo.svg" },
  { id: "reims", logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Stade_de_Reims_logo.svg" },
  { id: "lens", logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/RC_Lens_logo.svg" },
  { id: "montpellier", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Montpellier_HSC_logo.svg" },
  { id: "strasbourg", logo: "https://upload.wikimedia.org/wikipedia/en/8/80/RC_Strasbourg_Alsace_logo.svg" },
  { id: "nantes", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/FC_Nantes_2019_logo.svg" },
  { id: "toulouse", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Toulouse_FC.svg" },
  { id: "le-havre", logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/Le_Havre_AC.svg" },
  { id: "brest", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Stade_Brestois_29_logo.svg" },
  { id: "metz", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/FC_Metz_logo.svg" },
  { id: "lorient", logo: "https://upload.wikimedia.org/wikipedia/en/1/1e/FC_Lorient_logo.svg" },
  { id: "clermont", logo: "https://upload.wikimedia.org/wikipedia/en/5/52/Clermont_Foot_logo.svg" }
];

const leagues = [
  { id: "premier-league", logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" },
  { id: "laliga", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/LaLiga_logo_2023.svg" },
  { id: "serie-a", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg" },
  { id: "bundesliga", logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/Bundesliga_logo_%282017%29.svg" },
  { id: "ligue-1", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Ligue_1_Uber_Eats.svg" }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadLogos() {
  console.log('🎨 กำลังดาวน์โหลดโลโก้ทีม...\n');
  
  let success = 0;
  let failed = 0;
  
  // Download team logos
  for (const team of teams) {
    const filename = `${team.id}.svg`;
    const filepath = path.join(LOGOS_DIR, filename);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`  ⏭️  ${team.id} (มีอยู่แล้ว)`);
      success++;
      continue;
    }
    
    try {
      await downloadFile(team.logo, filepath);
      console.log(`  ✅ ${team.id}`);
      success++;
    } catch (err) {
      console.log(`  ❌ ${team.id}: ${err.message}`);
      failed++;
    }
    
    // Small delay to be nice to Wikipedia servers
    await new Promise(r => setTimeout(r, 100));
  }
  
  // Download league logos
  console.log('\n🏆 กำลังดาวน์โหลดโลโก้ลีก...\n');
  
  for (const league of leagues) {
    const filename = `${league.id}.svg`;
    const filepath = path.join(LOGOS_DIR, filename);
    
    if (fs.existsSync(filepath)) {
      console.log(`  ⏭️  ${league.id} (มีอยู่แล้ว)`);
      success++;
      continue;
    }
    
    try {
      await downloadFile(league.logo, filepath);
      console.log(`  ✅ ${league.id}`);
      success++;
    } catch (err) {
      console.log(`  ❌ ${league.id}: ${err.message}`);
      failed++;
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n📊 สรุป: ${success} สำเร็จ, ${failed} ล้มเหลว`);
  console.log(`📁 โลโก้อยู่ที่: ${LOGOS_DIR}`);
}

downloadLogos().catch(console.error);
