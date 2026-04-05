import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
  startAfter,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Collections references
const leaguesRef = collection(db, 'leagues');
const teamsRef = collection(db, 'teams');
const imagesRef = collection(db, 'images');
const pinsRef = collection(db, 'pins');

// Get all leagues
export const getLeagues = async () => {
  try {
    const snapshot = await getDocs(query(leaguesRef, orderBy('order', 'asc')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching leagues:', error);
    return [];
  }
};

// Get all teams
export const getTeams = async () => {
  try {
    const snapshot = await getDocs(teamsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

// Get teams by league
export const getTeamsByLeague = async (leagueId) => {
  try {
    const q = query(teamsRef, where('leagueId', '==', leagueId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching teams by league:', error);
    return [];
  }
};

// Get team by ID
export const getTeamById = async (teamId) => {
  try {
    const docRef = doc(db, 'teams', teamId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching team:', error);
    return null;
  }
};

// Get league by ID
export const getLeagueById = async (leagueId) => {
  try {
    const docRef = doc(db, 'leagues', leagueId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching league:', error);
    return null;
  }
};

// Get images by team
export const getImagesByTeam = async (teamId) => {
  try {
    const q = query(imagesRef, where('teamId', '==', teamId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

// Real-time listeners
export const subscribeToTeams = (callback) => {
  return onSnapshot(teamsRef, (snapshot) => {
    const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(teams);
  });
};

export const subscribeToImagesByTeam = (teamId, callback) => {
  const q = query(imagesRef, where('teamId', '==', teamId));
  return onSnapshot(q, (snapshot) => {
    const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(images);
  });
};

// Search images by tags or player name
export const searchImages = async (searchTerm) => {
  try {
    const snapshot = await getDocs(imagesRef);
    const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const lowerTerm = searchTerm.toLowerCase();
    return images.filter(img =>
      img.playerName?.toLowerCase().includes(lowerTerm) ||
      img.tags?.some(tag => tag.toLowerCase().includes(lowerTerm))
    );
  } catch (error) {
    console.error('Error searching images:', error);
    return [];
  }
};

// ===== PINS (Pinterest-Style) FUNCTIONS =====

// Get pins with pagination (optimized for free tier)
export const getPins = async (lastDoc = null, pageSize = 20) => {
  try {
    let q = query(pinsRef, orderBy('createdAt', 'desc'), limit(pageSize));
    if (lastDoc) {
      q = query(pinsRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(pageSize));
    }
    const snapshot = await getDocs(q);
    return {
      pins: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      lastDoc: snapshot.docs[snapshot.docs.length - 1]
    };
  } catch (error) {
    console.error('Error fetching pins:', error);
    return { pins: [], lastDoc: null };
  }
};

// Get pins by team/collection
export const getPinsByTeam = async (teamId, pageSize = 20) => {
  try {
    const q = query(
      pinsRef,
      where('teamId', '==', teamId),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching pins by team:', error);
    return [];
  }
};

// Get single pin
export const getPinById = async (pinId) => {
  try {
    const docRef = doc(db, 'pins', pinId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching pin:', error);
    return null;
  }
};

// Create pin
export const createPin = async (pinData) => {
  try {
    const docRef = await addDoc(pinsRef, {
      ...pinData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...pinData };
  } catch (error) {
    console.error('Error creating pin:', error);
    throw error;
  }
};

// Update pin
export const updatePin = async (pinId, pinData) => {
  try {
    const docRef = doc(db, 'pins', pinId);
    await updateDoc(docRef, {
      ...pinData,
      updatedAt: serverTimestamp()
    });
    return { id: pinId, ...pinData };
  } catch (error) {
    console.error('Error updating pin:', error);
    throw error;
  }
};

// Delete pin
export const deletePin = async (pinId) => {
  try {
    const docRef = doc(db, 'pins', pinId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting pin:', error);
    throw error;
  }
};

// Search pins by tags
export const searchPins = async (searchTerm) => {
  try {
    const snapshot = await getDocs(pinsRef);
    const pins = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const lowerTerm = searchTerm.toLowerCase();
    return pins.filter(pin =>
      pin.title?.toLowerCase().includes(lowerTerm) ||
      pin.description?.toLowerCase().includes(lowerTerm) ||
      pin.tags?.some(tag => tag.toLowerCase().includes(lowerTerm))
    );
  } catch (error) {
    console.error('Error searching pins:', error);
    return [];
  }
};

// Get pins for RSS feed
export const getPinsForRSS = async (limitCount = 50) => {
  try {
    const q = query(pinsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching pins for RSS:', error);
    return [];
  }
};
