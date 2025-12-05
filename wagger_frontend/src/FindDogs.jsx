import React, { useState } from "react";
import "./SwipePage.css";

const DOGS = [
  {
    id: 1,
    name: "Luna",
    age: 3,
    breed: "Border Collie",
    distance: "2 miles away",
    bio: "Ball-obsessed genius. Needs lots of fetch and brain games.",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    tags: ["High energy", "Good with kids", "Needs long walks"],
  },
  {
    id: 2,
    name: "Moose",
    age: 5,
    breed: "Golden Retriever",
    distance: "0.8 miles away",
    bio: "Professional good boy. Loves belly rubs and chill walks.",
    image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
    tags: ["Chill", "Good with other dogs", "Beginner friendly"],
  },
];

export default function FindDogs() {
  const [index, setIndex] = useState(0);
  const dog = DOGS[index];

  function swipe(dir) {
    setIndex((i) => i + 1);
  }

  if (!dog) {
    return (
      <div className="find-dogs-container">
        <h1>No more dogs!</h1>
        <p>Check back later for more pups to walk 🐶</p>
      </div>
    );
  }

  return (
    <div className="find-dogs-container">
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
  );
}

