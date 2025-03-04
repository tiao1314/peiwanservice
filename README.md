# Discord NBZ - OAuth2 Authentication Backend

## Overview
This project implements Discord OAuth2 authentication using Node.js and Express. Users can log in with their Discord accounts, and their profile information is retrieved.

## Features Implemented
- Discord OAuth2 authentication
- Express.js backend with Passport.js
- Session management using express-session
- CORS enabled to allow frontend connections
- API endpoint to fetch logged-in user data

## Setup Instructions

### Prerequisites
- Node.js installed (v14+ recommended)
- A Discord Developer Application ([Create one here](https://discord.com/developers/applications))

### Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/discord-nbz.git
   cd discord-nbz
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```env
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_CLIENT_SECRET=your_client_secret
   DISCORD_REDIRECT_URI=http://localhost:5050/auth/discord/callback
   SESSION_SECRET=your_random_secret
   ```
4. Start the server:
   ```sh
   node server.js
   ```
5. Open a browser and visit:
   ```
   http://localhost:5050/auth/discord
   ```

## API Endpoints
| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/auth/discord`         | Initiates Discord login |
| GET    | `/auth/discord/callback` | Handles login callback |
| GET    | `/auth/logout`          | Logs out the user |
| GET    | `/auth/user`            | Fetches logged-in user info |
| GET    | `/debug/session`        | Displays session data |

## Common Errors & Fixes

### 1. **Invalid OAuth2 redirect_uri**
**Error Message:**
```
Invalid OAuth2 redirect_uri
```
**Fix:**
- Ensure your `.env` file has the correct `DISCORD_REDIRECT_URI`:
  ```env
  DISCORD_REDIRECT_URI=http://localhost:5050/auth/discord/callback
  ```
- Update the **OAuth2 Redirects** in the [Discord Developer Portal](https://discord.com/developers/applications) to match.
- Restart your server:
  ```sh
  node server.js
  ```

### 2. **EADDRINUSE: Address Already in Use**
**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Fix:**
- Find the process using port 5000:
  ```sh
  sudo lsof -i :5000
  ```
- Kill the process (replace `PID` with the actual number):
  ```sh
  sudo kill -9 PID
  ```
- Restart the server:
  ```sh
  node server.js
  ```
- Alternatively, change the port in `server.js`:
  ```javascript
  const PORT = process.env.PORT || 5050;
  ```

### 3. **User Info Not Displaying After Login**
**Fix:**
- Ensure session is working properly by checking:
  ```
  http://localhost:5050/debug/session
  ```
- If empty, modify the session middleware in `server.js`:
  ```javascript
  app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
  }));
  ```
- Restart the server.

## Next Steps
- Build a frontend in React (Next.js) to handle login/logout UI.
- Store user data in a database (MongoDB or PostgreSQL).
- Implement an admin panel to manage user roles.

---
**Author:** tiao | **Date:** March 4, 2025

