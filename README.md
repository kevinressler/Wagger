# Wagger
Find your perfect match… one wag at a time.

Wagger is a playful matching app for **dog owners** and **dog lovers**. Instead of swiping, you **wag** through profiles to find walking buddies, play-date partners, sitters, or something more. It’s Tinder meets your local dog park.

---

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
   Add photos and details about you and your dog.

2. **Start Wagging**  
   Browse local profiles and wag the ones you like.

3. **Get a Mutual Wag**  
   If they wag you back, you’re matched.

4. **Meet Up**  
   Use suggested parks and dog-friendly spots to plan real-world meetups.

---

## Tech Stack

This project uses:
- **Frontend:** Swift  
- **Backend:** Swift  
- **Database:** Firebase  
- **Auth:** Firebase Auth
- **Storage:** Firestore 

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

## Running Locally

```bash
git clone https://github.com/your-username/wagger.git
cd wagger
npm install      # or pip install -r requirements.txt for Flask
npm start        # or flask run
