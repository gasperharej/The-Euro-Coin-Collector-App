//// updateImagePaths.js
//const admin = require('firebase-admin');
//const serviceAccount = require('./serviceAccountKey.json'); // Poskrbite, da je pot do vašega Firebase Admin ključa pravilna
//
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount)
//});
//
//const db = admin.firestore();
//const coinsCollection = db.collection('coins');
//
//async function updateImagePaths() {
//  try {
//    const snapshot = await coinsCollection.get();
//    const batch = db.batch();
//    let updatedCount = 0;
//
//    snapshot.forEach(doc => {
//      const coin = doc.data();
//      if (coin.image && coin.image.includes('1€')) {
//        // Zamenjamo "1€/" z "1_euro/"
//        const newImage = coin.image.replace('1€/', '1_euro/');
//        batch.update(doc.ref, { image: newImage });
//        console.log(`Dokument ${doc.id}: ${coin.image} -> ${newImage}`);
//        updatedCount++;
//      }
//    });
//
//    await batch.commit();
//    console.log(`Posodobljenih je bilo ${updatedCount} dokumentov.`);
//  } catch (error) {
//    console.error("Napaka pri posodabljanju poti do slik:", error);
//  }
//}
//
//updateImagePaths();
