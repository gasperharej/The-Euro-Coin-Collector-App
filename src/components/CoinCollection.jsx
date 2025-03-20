// src/components/CoinCollection.jsx
import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';

const CoinCollection = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = firestore.collection('users').doc(user.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const data = doc.data();
        setCoins(data.collection || []);
      }
    };

    fetchCollection();
  }, []);

  return (
    <div>
      <h2>My collection</h2>
      {coins.length > 0 ? (
        <ul>
          {coins.map((coinId) => (
            <li key={coinId}>{coinId}</li>
          ))}
        </ul>
      ) : (
        <p>No added coins.</p>
      )}
    </div>
  );
};

export default CoinCollection;
