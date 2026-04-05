import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

// Upload image to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, `images/${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, path: snapshot.ref.fullPath };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Get download URL for an image
export const getImageUrl = async (path) => {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
};

// Delete image from storage
export const deleteImage = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Upload multiple images
export const uploadMultipleImages = async (files, teamId, playerName) => {
  const uploadPromises = files.map(async (file, index) => {
    const timestamp = Date.now();
    const path = `${teamId}/${playerName.replace(/\s+/g, '_')}_${timestamp}_${index}`;
    return uploadImage(file, path);
  });
  
  return Promise.all(uploadPromises);
};
