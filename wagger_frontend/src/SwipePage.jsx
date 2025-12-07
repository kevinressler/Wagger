import React, { useState, useEffect } from "react";
import "./SwipePage.css";

// Import all dog images from the img folder
const dogImages = import.meta.glob('./img/*.{jpg,jpeg,png}', { eager: true });
const imagePaths = Object.values(dogImages).map(img => img.default);

// Function to get a random dog image
function getRandomDogImage() {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
}

export default function SwipePage() {
  const [dogs, setDogs] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/dogs')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Dogs response:', data);
        
        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error('Expected array but got:', data);
          setDogs([]);
          setLoading(false);
          return;
        }
        
        // Map database fields to component expected fields
        const mappedDogs = data.map(dog => ({
          id: dog.id,
          name: dog.dog_name,
          age: dog.age,
          breed: dog.breed,
          distance: dog.distance ? `${dog.distance} miles away` : "Distance unknown",
          bio: dog.bio || "No bio available",
          image: getRandomDogImage(), // Use random local image from img folder
          tags: dog.tags || []
        }));
        console.log('Mapped dogs:', mappedDogs);
        setDogs(mappedDogs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dogs:', err);
        setDogs([]);
        setLoading(false);
      });
  }, []);

  const dog = dogs[index];

  function swipe(dir) {
    setIndex((i) => i + 1);
  }

  if (loading) {
    return (
      <div className="swipe-page">
        <div className="swipe-container">
          <h1>Loading dogs...</h1>
          <p>Fetching the best pups for you 🐶</p>
        </div>
      </div>
    );
  }

  if (dogs.length === 0) {
    return (
      <div className="swipe-page">
        <div className="swipe-container">
          <h1>No dogs available</h1>
          <p>There are no dogs in the database. Add some dogs to get started! 🐶</p>
        </div>
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="swipe-page">
        <div className="swipe-container">
          <h1>No more dogs!</h1>
          <p>You've seen all available dogs. Check back later for more pups to walk 🐶</p>
        </div>
      </div>
    );
  }

  return (
    <div className="swipe-page">
      <div className="swipe-container">

        {/* HEADER */}
        <div className="swipe-header">
          <div className="logo">🐶 Wagger</div>
          <div className="user-pill">Logged in as You</div>
        </div>

        {/* CONTENT */}
        <div className="swipe-content">

          {/* LEFT MENU */}
          <div className="menu">
            <h2>Navigation</h2>
            <ul>
              <li>Find Dogs</li>
              <li>Your Matches</li>
              <li>Messages</li>
              <li>Settings</li>
            </ul>
          </div>

          {/* CARD */}
          <div className="dog-card">
            <img src={dog.image} alt="" className="dog-img" />

            <div className="dog-info">
              <h1>{dog.name} <span className="age">{dog.age}</span></h1>
              <div className="breed">{dog.breed}</div>
              <div className="distance">{dog.distance}</div>

              <p className="bio">{dog.bio}</p>

              <div className="tags">
                {dog.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <div className="buttons">
                <button className="btn nope" onClick={() => swipe("left")}>✕ Pass</button>
                <button className="btn like" onClick={() => swipe("right")}>💚 Wag</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}