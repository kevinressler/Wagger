# Wagger
Find your perfect match… one wag at a time.

Wagger is a playful matching app for **dog owners** and **dog lovers**. Instead of swiping, you **wag** through profiles to find walking buddies, play-date partners, sitters, or something more. It’s Tinder meets your local dog park.

---
## Run Instructions
Make sure you have Node.js installed
In wagger_backend check the connection to the database by running node server.js. It should say "Connected to PostgreSQL"
In wagger_frontend run npm run dev :) 


## Features

### Wag-to-Match
No left or right swipes. Tap **Wag** to show interest or **Sniff Again** to pass. When two people wag each other, it becomes a **Mutual Wag** and unlocks chat.

### Pup Profiles
Every user builds:
- A HumanCard  
- A PupCard (optional but encouraged)

Add photos, dog details, personality tags, and favorite park spots.

### BarkBoard Chat
Once you get a Mutual Wag, jump into BarkBoard.
- Send messages in real time  
- Drop “Bark” reactions  
- Share dog pics instantly  
- Get icebreakers tailored to you and your dog

### Park Discovery
Explore dog-friendly parks, cafés, and trails nearby. Location-aware suggestions help you plan play dates or walks.

### Smart Filters
Match based on:
- Owner or dog lover  
- Breed, size, or energy level  
- Walking frequency  
- Distance  
- Intent (walk buddies, play dates, fostering interest, dating)

---

## How It Works

1. **Create your PupCard**  
   If you have a dog, add photos and details about you and your dog. If you're looking for a dog, select your location and breed preferences. 

2. **Start Wagging**  
   Browse local profiles and wag the ones you like.

3. **Get a Mutual Wag**  
   If they wag you back, you’re matched.

4. **Meet Up**  
   Use suggested parks and dog-friendly spots to plan real-world meetups.

---

## Tech Stack

This project uses:
- **Frontend:** ReactJS
- **Backend:** FLASK
- **Database:** PostgreSQL
- **Version Control:** GitHub
- **Deployment:** Local 

---

## API Overview (Example)

### POST `/wag`
Submit a wag from one user to another.

### GET `/profiles`
Fetch a feed of nearby HumanCards and PupCards.

### GET `/matches`
Return all Mutual Wags for the current user.

### POST `/chat/send`
Send a message in a BarkBoard chat thread.

*(These endpoints are placeholders; update based on your backend.)*

---
