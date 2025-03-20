//// src/components/CoinCard.jsx
//import React, { useState, useEffect } from "react";
//import { auth, firestore } from "../firebase";
//import "./CoinCard.css"; // Ustvarite, če želite dodati CSS stilizacijo
//
//const CoinCard = ({ coin }) => {
//  const [inCollection, setInCollection] = useState(false);
//  const currentUser = auth.currentUser;
//
//  useEffect(() => {
//    const fetchCollection = async () => {
//      if (currentUser) {
//        const userDoc = await firestore.collection("users").doc(currentUser.uid).get();
//        const userData = userDoc.data();
//        if (userData && userData.collection) {
//          setInCollection(userData.collection.includes(coin.id));
//        }
//      }
//    };
//    fetchCollection();
//  }, [currentUser, coin.id]);
//  
//
//  const addToCollection = async () => {
//    if (!currentUser) {
//      alert("Please log in to add coins to your collection.");
//      return;
//    }
//    const userRef = firestore.collection("users").doc(currentUser.uid);
//    await userRef.set(
//      { collection: firestore.FieldValue.arrayUnion(coin.id) },
//      { merge: true }
//    );
//    setInCollection(true);
//  };
//
//  const removeFromCollection = async () => {
//    if (!currentUser) return;
//    const userRef = firestore.collection("users").doc(currentUser.uid);
//    await userRef.set(
//      { collection: firestore.FieldValue.arrayRemove(coin.id) },
//      { merge: true }
//    );
//    setInCollection(false);
//  };
//
//  const handleCollectionClick = () => {
//    if (!currentUser) {
//      alert("Please log in to modify your collection.");
//      return;
//    }
//    if (inCollection) {
//      removeFromCollection();
//    } else {
//      addToCollection();
//    }
//  };
//
//  return (
//    <div className="coin-card">
//      {coin.imageURL ? (
//        <img src={coin.imageURL} alt={coin.name} />
//      ) : (
//        <p>No image available</p>
//      )}
//      <h3>{coin.name}</h3>
//      <p>{coin.country}</p>
//      <p>{coin.yearStart}{coin.yearEnd ? ` - ${coin.yearEnd}` : ""}</p>
//      <p>{coin.value}€</p>
//      <p>{coin.type}</p>
//      <button onClick={handleCollectionClick}>
//        {inCollection ? "Remove from collection" : "Add to collection"}
//      </button>
//    </div>
//  );
//};
//
//export default CoinCard;


// src/components/CoinCard.jsx
import React, { useState, useEffect } from "react";
import firebase from "../firebase"; // Uvozite Firebase, da lahko uporabite FieldValue
import { auth, firestore } from "../firebase";
import "./CoinCard.css"; // Ustvarite in prilagodite po potrebi

const CoinCard = ({ coin }) => {
  const [inCollection, setInCollection] = useState(false);
  const currentUser = auth.currentUser;

  // Funkcija za preverjanje, ali je kovanec že v uporabnikovi kolekciji
  useEffect(() => {
    const fetchCollectionStatus = async () => {
      if (currentUser) {
        const userDoc = await firestore.collection("users").doc(currentUser.uid).get();
        const userData = userDoc.data();
        if (userData && userData.collection) {
          setInCollection(userData.collection.includes(coin.id));
        } else {
          setInCollection(false);
        }
      }
    };
    fetchCollectionStatus();
  }, [currentUser, coin.id]);

  // Dodajanje kovanca v kolekcijo
  const addToCollection = async () => {
    if (!currentUser) {
      alert("Prosimo, prijavite se, da lahko dodate kovanec v kolekcijo.");
      return;
    }
    const userRef = firestore.collection("users").doc(currentUser.uid);
    await userRef.set(
      { collection: firebase.firestore.FieldValue.arrayUnion(coin.id) },
      { merge: true }
    );
    setInCollection(true);
  };

  // Odstranjevanje kovanca iz kolekcije
  const removeFromCollection = async () => {
    if (!currentUser) return;
    const userRef = firestore.collection("users").doc(currentUser.uid);
    await userRef.set(
      { collection: firebase.firestore.FieldValue.arrayRemove(coin.id) },
      { merge: true }
    );
    setInCollection(false);
  };

  // Funkcija, ki se izvede ob kliku na gumb
  const handleCollectionClick = () => {
    if (!currentUser) {
      alert("Prosimo, prijavite se, da lahko dodate kovanec v kolekcijo.");
      return;
    }
    if (inCollection) {
      removeFromCollection();
    } else {
      addToCollection();
    }
  };

  return (
    <div className="coin-card">
      {coin.imageURL || coin.image ? (
        <img src={coin.imageURL || coin.image} alt={coin.name} style={{ maxWidth: "100%" }} />
      ) : (
        <p>No image available</p>
      )}
      <h3>{coin.name}</h3>
      <p>{coin.country}</p>
      <p>{coin.yearStart}{coin.yearEnd ? ` - ${coin.yearEnd}` : ""}</p>
      <p>{coin.value}€</p>
      <p>{coin.type}</p>
      <button onClick={handleCollectionClick} style={{ display: "block", marginTop: "10px" }}>
        {inCollection ? "Remove from collection" : "Add to collection"}
      </button>
    </div>
  );
};

export default CoinCard;
