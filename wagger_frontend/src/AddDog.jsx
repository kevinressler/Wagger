import React, { useState } from "react";
import "./AddDog.css";

export default function AddDog() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    breed: "",
    distance: "",
    bio: "",
    tags: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!form.name || !form.age || !form.breed || !form.bio) {
      setError("Please fill in all required fields (name, age, breed, bio).");
      return;
    }

    // Convert tags string to array
    const tagsArray = form.tags
      ? form.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag)
      : [];

    const dogData = {
      name: form.name,
      age: parseInt(form.age, 10),
      breed: form.breed,
      distance: form.distance || "Unknown distance",
      bio: form.bio,
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      tags: tagsArray,
    };

    try {
      // TODO: Replace with actual API call
      // const res = await fetch("/api/dogs", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(dogData),
      // });
      // if (!res.ok) throw new Error("Failed to add dog");
      
      console.log("Dog data to submit:", dogData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setSuccess(true);
      // Reset form
      setForm({
        name: "",
        age: "",
        breed: "",
        distance: "",
        bio: "",
        tags: "",
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to add dog. Please try again.");
    }
  }

  return (
    <div className="add-dog-page">
      <div className="add-dog-container">
        <h1>Add a Dog</h1>
        <p className="subtitle">Create a profile for your furry friend</p>

        <form onSubmit={handleSubmit} className="add-dog-form">
          <div className="form-row">
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                placeholder="Luna"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Age</span>
              <input
                type="number"
                name="age"
                placeholder="3"
                min="0"
                max="20"
                value={form.age}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label className="field">
              <span>Breed</span>
              <input
                type="text"
                name="breed"
                placeholder="Border Collie"
                value={form.breed}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Distance</span>
              <input
                type="text"
                name="distance"
                placeholder="2 (miles away)"
                value={form.distance}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="field">
            <span>Bio</span>
            <textarea
              name="bio"
              placeholder="Tell us about your dog's personality, interests, and what makes them special..."
              rows="4"
              value={form.bio}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Tags (comma-separated)</span>
            <input
              type="text"
              name="tags"
              placeholder="High energy, Good with kids, Needs long walks"
              value={form.tags}
              onChange={handleChange}
            />
            <small>Separate multiple tags with commas</small>
          </label>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">Dog profile added successfully! 🐶</div>}

          <button type="submit" className="submit-btn">
            Add Dog
          </button>
        </form>
      </div>
    </div>
  );
}

