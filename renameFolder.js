//const admin = require('firebase-admin');
//const serviceAccount = require('./serviceAccountKey.json');
//
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//  storageBucket: 'coins-c790a.firebasestorage.app'
//});
//
//const bucket = admin.storage().bucket();
//
//// Funkcija za kopiranje datoteke
//async function copyFile(oldPath, newPath) {
//  await bucket.file(oldPath).copy(bucket.file(newPath));
//  console.log(`Kopirano: ${oldPath} -> ${newPath}`);
//  // Po kopiranju izbrišite staro datoteko, če želite:
//  await bucket.file(oldPath).delete();
//  console.log(`Izbrisano: ${oldPath}`);
//}
//
//async function renameFolder(oldFolder, newFolder) {
//  const [files] = await bucket.getFiles({ prefix: oldFolder });
//  for (const file of files) {
//    const oldPath = file.name; // npr. "1€/Andorra_1euro.webp"
//    // Nastavite novo pot tako, da zamenjate staro mapo z novo
//    const newPath = oldPath.replace(oldFolder, newFolder);
//    await copyFile(oldPath, newPath);
//  }
//  console.log('Preimenovanje mape je zaključeno.');
//}
//
//// Uporaba: Preimenujemo mapo "1€/" v "1_euro/"
//renameFolder("1€/", "1_euro/").catch(console.error);
