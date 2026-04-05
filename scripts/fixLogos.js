const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://classic-e8ab7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

// Complete team data with all logos
const allTeams = [
  // Premier League (20)
  { id: "manchester-united", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png" },
  { id: "manchester-city", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png" },
  { id: "liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" },
  { id: "arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" },
  { id: "chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png" },
  { id: "tottenham", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png" },
  { id: "newcastle", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/1200px-Newcastle_United_Logo.svg.png" },
  { id: "aston-villa", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Aston_Villa_FC_crest_%282016%29.svg/1200px-Aston_Villa_FC_crest_%282016%29.svg.png" },
  { id: "brighton", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png" },
  { id: "west-ham", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/West_Ham_United_FC_logo.svg/1200px-West_Ham_United_FC_logo.svg.png" },
  { id: "crystal-palace", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Crystal_Palace_FC_logo_%282022%29.svg/1200px-Crystal_Palace_FC_logo_%282022%29.svg.png" },
  { id: "brentford", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Brentford_FC_crest.svg/1200px-Brentford_FC_crest.svg.png" },
  { id: "fulham", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Fulham_FC_%28shield%29.svg/1200px-Fulham_FC_%28shield%29.svg.png" },
  { id: "everton", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Everton_FC_logo.svg/1200px-Everton_FC_logo.svg.png" },
  { id: "nottingham-forest", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Nottingham_Forest_F.C._logo.svg/1200px-Nottingham_Forest_F.C._logo.svg.png" },
  { id: "bournemouth", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/AFC_Bournemouth_%282013%29.svg/1200px-AFC_Bournemouth_%282013%29.svg.png" },
  { id: "wolves", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Wolverhampton_Wanderers.svg/1200px-Wolverhampton_Wanderers.svg.png" },
  { id: "ipswich", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Ipswich_Town.svg/1200px-Ipswich_Town.svg.png" },
  { id: "leicester", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png" },
  { id: "southampton", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/FC_Southampton.svg/1200px-FC_Southampton.svg.png" },

  // La Liga (20)
  { id: "real-madrid", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" },
  { id: "barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png" },
  { id: "atletico-madrid", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png" },
  { id: "sevilla", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png" },
  { id: "real-sociedad", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/1200px-Real_Sociedad_logo.svg.png" },
  { id: "villarreal", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Villarreal_CF_logo.svg/1200px-Villarreal_CF_logo.svg.png" },
  { id: "real-betis", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_Betis_logo.svg/1200px-Real_Betis_logo.svg.png" },
  { id: "athletic-bilbao", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Club_Athletic_Bilbao_logo.svg/1200px-Club_Athletic_Bilbao_logo.svg.png" },
  { id: "valencia", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/1200px-Valenciacf.svg.png" },
  { id: "celta-vigo", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/RC_Celta_de_Vigo_logo.svg/1200px-RC_Celta_de_Vigo_logo.svg.png" },
  { id: "getafe", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Getafe_CF.svg/1200px-Getafe_CF.svg.png" },
  { id: "osasuna", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/CA_Osasuna_logo.svg/1200px-CA_Osasuna_logo.svg.png" },
  { id: "espanyol", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/RCD_Espanyol_logo.svg/1200px-RCD_Espanyol_logo.svg.png" },
  { id: "rayo-vallecano", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Rayo_Vallecano_logo.svg/1200px-Rayo_Vallecano_logo.svg.png" },
  { id: "las-palmas", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/UD_Las_Palmas_logo.svg/1200px-UD_Las_Palmas_logo.svg.png" },
  { id: "leganes", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/CD_Legan%C3%A9s_logo.svg/1200px-CD_Legan%C3%A9s_logo.svg.png" },
  { id: "mallorca", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/RCD_Mallorca_logo.svg/1200px-RCD_Mallorca_logo.svg.png" },
  { id: "alaves", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Deportivo_Alaves_logo.svg/1200px-Deportivo_Alaves_logo.svg.png" },
  { id: "girona", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Girona_FC.svg/1200px-Girona_FC.svg.png" },
  { id: "valladolid", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Real_Valladolid_Logo.svg/1200px-Real_Valladolid_Logo.svg.png" },

  // Serie A (20)
  { id: "juventus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png" },
  { id: "ac-milan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan_logo.svg/1200px-AC_Milan_logo.svg.png" },
  { id: "inter-milan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png" },
  { id: "napoli", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Napoli_-_Logo_%282020%29.svg/1200px-SSC_Napoli_-_Logo_%282020%29.svg.png" },
  { id: "roma", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/AS_Roma_logo_%282017%29.svg/1200px-AS_Roma_logo_%282017%29.svg.png" },
  { id: "lazio", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/SS_Lazio.svg/1200px-SS_Lazio.svg.png" },
  { id: "atalanta", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/AtalantaBC.svg/1200px-AtalantaBC.svg.png" },
  { id: "fiorentina", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/ACF_Fiorentina.svg/1200px-ACF_Fiorentina.svg.png" },
  { id: "bologna", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Bologna_F.C._1909_logo.svg/1200px-Bologna_F.C._1909_logo.svg.png" },
  { id: "torino", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Torino_FC_Logo.svg/1200px-Torino_FC_Logo.svg.png" },
  { id: "udinese", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Udinese_Calcio_logo.svg/1200px-Udinese_Calcio_logo.svg.png" },
  { id: "monza", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/AC_Monza_logo_%282021%29.svg/1200px-AC_Monza_logo_%282021%29.svg.png" },
  { id: "genoa", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Genoa_CFC.svg/1200px-Genoa_CFC.svg.png" },
  { id: "sassuolo", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/US_Sassuolo_Calcio_logo.svg/1200px-US_Sassuolo_Calcio_logo.svg.png" },
  { id: "empoli", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Empoli_FC.svg/1200px-Empoli_FC.svg.png" },
  { id: "salernitana", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/US_Salernitana_1919.svg/1200px-US_Salernitana_1919.svg.png" },
  { id: "lecce", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/US_Lecce.svg/1200px-US_Lecce.svg.png" },
  { id: "verona", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Hellas_Verona_FC_logo.svg/1200px-Hellas_Verona_FC_logo.svg.png" },
  { id: "cagliari", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cagliari_Calcio_1920.svg/1200px-Cagliari_Calcio_1920.svg.png" },
  { id: "frosinone", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Frosinone_Calcio.svg/1200px-Frosinone_Calcio.svg.png" },

  // Bundesliga (18)
  { id: "bayern-munich", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png" },
  { id: "borussia-dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png" },
  { id: "bayer-leverkusen", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/1200px-Bayer_04_Leverkusen_logo.svg.png" },
  { id: "rb-leipzig", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png" },
  { id: "eintracht-frankfurt", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Eintracht_Frankfurt_Logo.svg/1200px-Eintracht_Frankfurt_Logo.svg.png" },
  { id: "wolfsburg", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/VfL_Wolfsburg_Logo.svg/1200px-VfL_Wolfsburg_Logo.svg.png" },
  { id: "freiburg", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/SC_Freiburg_logo.svg/1200px-SC_Freiburg_logo.svg.png" },
  { id: "union-berlin", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/1._FC_Union_Berlin_Logo.svg/1200px-1._FC_Union_Berlin_Logo.svg.png" },
  { id: "borussia-mgladbach", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/1200px-Borussia_M%C3%B6nchengladbach_logo.svg.png" },
  { id: "stuttgart", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/VfB_Stuttgart_1893_Logo.svg/1200px-VfB_Stuttgart_1893_Logo.svg.png" },
  { id: "augsburg", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/FC_Augsburg_logo.svg/1200px-FC_Augsburg_logo.svg.png" },
  { id: "werder-bremen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SV-Werder-Bremen-Logo.svg/1200px-SV-Werder-Bremen-Logo.svg.png" },
  { id: "hoffenheim", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_TSG_1899_Hoffenheim.svg/1200px-Logo_TSG_1899_Hoffenheim.svg.png" },
  { id: "heidenheim", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/1._FC_Heidenheim_1846.svg/1200px-1._FC_Heidenheim_1846.svg.png" },
  { id: "mainz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/FSV_Mainz_05_Logo.svg/1200px-FSV_Mainz_05_Logo.svg.png" },
  { id: "bochum", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VfL_Bochum_logo.svg/1200px-VfL_Bochum_logo.svg.png" },
  { id: "darmstadt", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/SV_Darmstadt_98.svg/1200px-SV_Darmstadt_98.svg.png" },
  { id: "cologne", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/FC_Cologne_logo.svg/1200px-FC_Cologne_logo.svg.png" },

  // Ligue 1 (18)
  { id: "psg", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png" },
  { id: "marseille", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Olympique_Marseille_logo.svg/1200px-Olympique_Marseille_logo.svg.png" },
  { id: "monaco", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/AS_Monaco_FC.svg/1200px-AS_Monaco_FC.svg.png" },
  { id: "lille", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Lille_OSC_2018_logo.svg/1200px-Lille_OSC_2018_logo.svg.png" },
  { id: "lyon", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Olympique_Lyonnais.svg/1200px-Olympique_Lyonnais.svg.png" },
  { id: "rennes", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Stade_Rennais_FC.svg/1200px-Stade_Rennais_FC.svg.png" },
  { id: "nice", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/OGC_Nice_logo.svg/1200px-OGC_Nice_logo.svg.png" },
  { id: "reims", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Stade_de_Reims_logo.svg/1200px-Stade_de_Reims_logo.svg.png" },
  { id: "lens", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/RC_Lens_logo.svg/1200px-RC_Lens_logo.svg.png" },
  { id: "montpellier", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Montpellier_HSC_logo.svg/1200px-Montpellier_HSC_logo.svg.png" },
  { id: "strasbourg", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/RC_Strasbourg_Alsace_logo.svg/1200px-RC_Strasbourg_Alsace_logo.svg.png" },
  { id: "nantes", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/FC_Nantes_2019_logo.svg/1200px-FC_Nantes_2019_logo.svg.png" },
  { id: "toulouse", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Toulouse_FC.svg/1200px-Toulouse_FC.svg.png" },
  { id: "le-havre", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Le_Havre_AC.svg/1200px-Le_Havre_AC.svg.png" },
  { id: "brest", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Stade_Brestois_29_logo.svg/1200px-Stade_Brestois_29_logo.svg.png" },
  { id: "metz", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/FC_Metz_logo.svg/1200px-FC_Metz_logo.svg.png" },
  { id: "lorient", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/FC_Lorient_logo.svg/1200px-FC_Lorient_logo.svg.png" },
  { id: "clermont", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Clermont_Foot_logo.svg/1200px-Clermont_Foot_logo.svg.png" }
];

async function fixMissingLogos() {
  console.log('🔍 กำลังตรวจสอบและแก้ไขโลโก้ที่ขาดหาย...');
  
  let updated = 0;
  let missing = 0;
  
  for (const team of allTeams) {
    try {
      const teamRef = db.collection('teams').doc(team.id);
      const doc = await teamRef.get();
      
      if (doc.exists) {
        const data = doc.data();
        if (!data.logo || data.logo === '') {
          await teamRef.update({ logo: team.logo });
          console.log(`✅ อัปเดตโลโก้: ${team.id}`);
          updated++;
        }
      } else {
        console.log(`⚠️ ไม่พบทีม: ${team.id}`);
        missing++;
      }
    } catch (error) {
      console.error(`❌ ผิดพลาด ${team.id}:`, error.message);
    }
  }
  
  console.log(`\n📊 สรุป: อัปเดต ${updated} ทีม, ไม่พบ ${missing} ทีม`);
  process.exit(0);
}

fixMissingLogos();
