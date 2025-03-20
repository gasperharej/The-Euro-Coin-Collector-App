// src/utils/coinActions.js
import firebase, { firestore, auth } from '../firebase';

export const addCoinToCollection = async (coinId) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Uporabnik ni prijavljen.");
    return;
  }

  const userRef = firestore.collection('users').doc(user.uid);
  try {
    await userRef.set({
      collection: firebase.firestore.FieldValue.arrayUnion(coinId)
    }, { merge: true });
    console.log(`Kovanec ${coinId} dodan v zbirko.`);
  } catch (error) {
    console.error("Napaka pri dodajanju kovanca:", error);
  }
};
