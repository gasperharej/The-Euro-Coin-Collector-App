// src/MyCollection.jsx
import React, { useEffect, useState, useMemo } from "react";
import firebase from "firebase/compat/app";
import { auth, firestore } from "./firebase";
import CoinCard from "./components/CoinCard";
//import { Input } from "./components/ui/Input";
import "./MyCollection.css";

const MyCollection = () => {
  const [myCoinIds, setMyCoinIds] = useState([]);
  const [myCoins, setMyCoins] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  //const currentUser = auth.currentUser;

  // Filtri in sortiranje
  const [filterYear, setFilterYear] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOption, setSortOption] = useState("none");

  // Spremljanje avtentikacijskega stanja in nalaganje uporabnikove zbirke
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            const data = doc.data();
            const collection = data?.collection || [];
            setMyCoinIds(collection);
            setUserLoaded(true);
          });
      } else {
        setUserLoaded(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Poizvedba za kovance, ki so v uporabnikovi zbirki (uporabimo chunking, če je več kot 10 ID-jev)
  useEffect(() => {
    if (!myCoinIds || myCoinIds.length === 0) {
      setMyCoins([]);
      setLoading(false);
      return;
    }
    const chunkSize = 10;
    const chunks = [];
    for (let i = 0; i < myCoinIds.length; i += chunkSize) {
      chunks.push(myCoinIds.slice(i, i + chunkSize));
    }
    Promise.all(
      chunks.map((chunk) =>
        firestore
          .collection("coins")
          .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
          .get()
      )
    )
      .then((snapshots) => {
        const coinsData = snapshots.flatMap((snapshot) =>
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setMyCoins(coinsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading collection:", error);
        setLoading(false);
      });
  }, [myCoinIds]);

  // Pridobivanje prenosnih URL-jev slik, če je URL v obliki "gs://"
  useEffect(() => {
    myCoins.forEach((coin) => {
      if (coin.image && coin.image.startsWith("gs://")) {
        firebase
          .storage()
          .refFromURL(coin.image)
          .getDownloadURL()
          .then((url) => {
            setDownloadUrls((prev) => ({ ...prev, [coin.id]: url }));
          })
          .catch((error) => {
            console.error("Error getting download URL for coin", coin.id, error);
          });
      }
    });
  }, [myCoins]);

  // Filtriranje in sortiranje: uporabili bomo enak pristop kot na prvi strani, a le na naloženih kovancih v zbirki
  const filteredAndSortedCoins = useMemo(() => {
    let filtered = [...myCoins];
    
    // Filter po letu
    if (filterYear !== "") {
      const yearNum = parseInt(filterYear);
      filtered = filtered.filter(
        (coin) =>
          coin.yearStart <= yearNum &&
          (coin.yearEnd === null || yearNum <= coin.yearEnd)
      );
    }
    
    // Filter po tipu
    if (filterType !== "") {
      filtered = filtered.filter(
        (coin) => coin.type.toLowerCase() === filterType.toLowerCase()
      );
    }
    
    // Sortiranje
    if (sortOption !== "none") {
      filtered.sort((a, b) => {
        if (sortOption === "country") {
          return (a.country || "").localeCompare(b.country || "");
        } else if (sortOption === "year") {
          return (a.yearStart || 0) - (b.yearStart || 0);
        } else if (sortOption === "value") {
          return (a.value || 0) - (b.value || 0);
        } else if (sortOption === "type") {
          return (a.type || "").localeCompare(b.type || "");
        }
        return 0;
      });
    }
    return filtered;
  }, [myCoins, filterYear, filterType, sortOption]);

  if (!userLoaded) {
    return <p>Loading user info...</p>;
  }
  if (!auth.currentUser) {
    return <p>Please log in to view your collection.</p>;
  }
  if (loading) return <p>Loading your collection...</p>;

  return (
    <div className="my-collection">
      <h2>My Collection</h2>
      
      {/* Filter in sort meni */}
      <div className="collection-filters">
        <label>
          Filter by year:
          <input
            type="number"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            placeholder="ex. 2005"
          />
        </label>
        <label>
          Filter by type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All</option>
            <option value="national">National</option>
            <option value="commemorative">Commemorative</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="none">Default</option>
            <option value="country">Country (A-Z)</option>
            <option value="year">Year (ascending)</option>
            <option value="value">Value (ascending)</option>
            <option value="type">Type (A-Z)</option>
          </select>
        </label>
      </div>

      {/* Prikaz kovancev v mrežnem formatu */}
      <div className="collection-grid">
        {filteredAndSortedCoins.length > 0 ? (
          filteredAndSortedCoins.map((coin) => (
            <CoinCard
              key={coin.id}
              coin={{
                ...coin,
                imageURL: downloadUrls[coin.id] || coin.image,
              }}
            />
          ))
        ) : (
          <p>No coins match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default MyCollection;

