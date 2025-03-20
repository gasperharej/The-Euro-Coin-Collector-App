// src/components/CoinList.jsx
import React, { useEffect, useState, useMemo } from 'react';
import firebase from 'firebase/compat/app';
import { firestore } from '../firebase';
import CoinCard from './CoinCard';
import './CoinList.css';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState({});
  const [loading, setLoading] = useState(true);

  // Stanja za filtre in sortiranje
  const [filterYear, setFilterYear] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOption, setSortOption] = useState('none'); // Možnosti: 'none', 'country', 'year', 'value', 'type'

  // Naloži podatke iz Firestore
  useEffect(() => {
    const unsubscribe = firestore.collection('coins').onSnapshot(snapshot => {
      const coinsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Naloženi kovanci:", coinsData);
      setCoins(coinsData);
      setLoading(false);
    }, error => {
      console.error("Napaka pri nalaganju kovancev:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Pridobi prenosne URL-je slik za "gs://" reference
  useEffect(() => {
    coins.forEach(coin => {
      if (coin.image && coin.image.startsWith("gs://")) {
        firebase.storage().refFromURL(coin.image).getDownloadURL()
          .then(url => {
            setDownloadUrls(prev => ({ ...prev, [coin.id]: url }));
          })
          .catch(error => {
            console.error("Napaka pri pridobivanju URL-ja slike za kovanec", coin.id, error);
          });
      }
    });
  }, [coins]);

  // Funkcija, ki filtrira in sortira kovance
  const filteredAndSortedCoins = useMemo(() => {
    let filtered = [...coins];
    
    // Filtriranje po letu (glede na yearStart in yearEnd)
    if (filterYear !== '') {
      const yearNum = parseInt(filterYear);
      filtered = filtered.filter(coin =>
        coin.yearStart <= yearNum && (coin.yearEnd === null || yearNum <= coin.yearEnd)
      );
    }
    
    // Filtriranje po tipu
    if (filterType !== '') {
      filtered = filtered.filter(coin =>
        coin.type.toLowerCase() === filterType.toLowerCase()
      );
    }
    
    // Sortiranje
    if (sortOption !== 'none') {
      filtered.sort((a, b) => {
        if (sortOption === 'country') {
          return a.country.localeCompare(b.country);
        } else if (sortOption === 'year') {
          return a.yearStart - b.yearStart;
        } else if (sortOption === 'value') {
          return a.value - b.value;
        } else if (sortOption === 'type') {
          return a.type.localeCompare(b.type);
        }
        return 0;
      });
    }
    
    return filtered;
  }, [coins, filterYear, filterType, sortOption]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Coins</h2>
      {/* Meni za filtre in sortiranje */}
      <div className="filter-menu">
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
      <div className="coin-container">
        {filteredAndSortedCoins.length > 0 ? (
          filteredAndSortedCoins.map(coin => (
            <CoinCard 
              key={coin.id} 
              coin={{ ...coin, imageURL: downloadUrls[coin.id] || coin.image }} 
            />
          ))
        ) : (
          <p>No coins match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default CoinList;
