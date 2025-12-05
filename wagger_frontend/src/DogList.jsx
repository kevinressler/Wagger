import React, { useState, useEffect } from 'react';

function DogList() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dogs');
      const data = await response.json();
      setDogs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dogs:', error);
      setLoading(false);
    }
  };

  const addDog = async (dogData) => {
    try {
      const response = await fetch('http://localhost:5000/api/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dogData),
      });
      const newDog = await response.json();
      setDogs([...dogs, newDog]);
    } catch (error) {
      console.error('Error adding dog:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dogs Near You</h1>
      {dogs.map((dog) => (
        <div key={dog.id} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
          <h2>{dog.dog_name}</h2>
          <p>Age: {dog.age} | Breed: {dog.breed}</p>
          <p>Distance: {dog.distance} miles</p>
          <p>{dog.bio}</p>
          <div>
            {dog.tags && dog.tags.map((tag) => (
              <span key={tag} style={{ 
                backgroundColor: '#e0e0e0', 
                padding: '5px 10px', 
                margin: '5px', 
                borderRadius: '15px' 
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DogList;



// ============================================
// .env FILE (create this in backend folder)
// ============================================

/*
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tinder_app
DB_PASSWORD=your_password_here
DB_PORT=5432
*/