// FirebaseDataComponent.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const FirebaseDataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      const db = getFirestore();
      const dataCollection = collection(db, 'yourCollectionName'); // Replace with your actual collection name

      try {
        const snapshot = await getDocs(dataCollection);
        const dataFromFirebase = snapshot.docs.map((doc) => doc.data());
        setData(dataFromFirebase);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error.message);
      }
    };

    fetchDataFromFirebase();
  }, []);

  return (
    <div>
      {/* Render your component based on the data */}
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default FirebaseDataComponent;
