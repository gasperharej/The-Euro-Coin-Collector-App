//// seedCoins.js
//const admin = require('firebase-admin');
//const serviceAccount = require('./serviceAccountKey.json');
//const coinsData = require('./coins.json');
//
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount)
//});
//
//const db = admin.firestore();
//const coinsCollection = db.collection('coins');
//
//async function seedCoins() {
//  const batch = db.batch();
//
//  coinsData.forEach(coin => {
//    // Določimo privzeto strukturo kovanca, če kateri izmed polj manjka
//    const defaultCoin = {
//      name: '',
//      country: '',
//      value: 0,
//      type: '',
//      numberMinted: null,
//      yearStart: null,
//      yearEnd: null,
//      image: ''
//    };
//
//    const coinWithDefaults = { ...defaultCoin, ...coin };
//    const docRef = coinsCollection.doc(); // Samodejno generiran ID
//    batch.set(docRef, coinWithDefaults);
//  });
//
//  try {
//    await batch.commit();
//    console.log('Seeding uspešen.');
//  } catch (error) {
//    console.error('Napaka pri seeding-u kovancev:', error);
//  }
//}
//
//seedCoins();


// seedCoins.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const coinsData = require('./coins.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const coinsCollection = db.collection('coins');

async function seedCoins() {
  const batch = db.batch();

  coinsData.forEach(coin => {
    // Določimo privzeto strukturo kovanca, če kateri izmed polj manjka
    const defaultCoin = {
      name: '',
      country: '',
      value: 0,
      type: '',
      numberMinted: null,
      yearStart: null,
      yearEnd: null,
      image: ''
    };

    const coinWithDefaults = { ...defaultCoin, ...coin };
    
    // Ustvarimo edinstven ID na podlagi (npr.) države, imena in leta mintanja.
    // Ta pristop predpostavlja, da so te vrednosti dovolj unikatne za vsak kovanec.
    const uniqueId = `${coin.country}-${coin.name}-${coin.yearStart}-${coin.type}-${coin.value}`
                        .replace(/\s+/g, '_')
                        .replace(/[^\w-]/g, ''); // odstranimo posebne znake, če je potrebno

    const docRef = coinsCollection.doc(uniqueId);
    
    // Uporabite merge: true, če želite, da se obstoječi dokument posodobi, 
    // sicer merge: false (privzeto) za popolno zamenjavo.
    batch.set(docRef, coinWithDefaults, { merge: true });
  });

  try {
    await batch.commit();
    console.log('Seeding uspešen. Dokumenti so bili dodani/posodobljeni brez podvajanja.');
  } catch (error) {
    console.error('Napaka pri seeding-u kovancev:', error);
  }
}

seedCoins();
