# Next.js Discord OAuth2 Authentication

This project implements Discord OAuth2 authentication using **Next.js (Frontend)** and **Express.js (Backend)** with Passport.js.

## 🚀 Features
- **Discord Login** using OAuth2
- **Session Management** with Express sessions
- **User Info Display** (Avatar, Username, Email)
- **Logout Functionality**
- **Fully Responsive UI** with TailwindCSS
- **CORS enabled** to allow frontend connections
- **API endpoints** to fetch logged-in user data

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, React, TypeScript, TailwindCSS
- **Backend:** Express.js, Passport.js, Session-based Authentication
- **Database (Optional):** SQLite / MongoDB (for future enhancements)

## 📂 Folder Structure
```
📦 peiwanservice
 ┣ 📂 discord-nbz-backend (Backend)
 ┃ ┣ 📜 server.js (Express server with Discord OAuth2)
 ┃ ┣ 📜 .env (Environment variables)
 ┃ ┣ 📜 package.json (Backend dependencies)
 ┃ ┗ 📂 node_modules
 ┃
 ┣ 📂 discord-auth-frontend (Frontend)
 ┃ ┣ 📂 src/app (Next.js App Router)
 ┃ ┃ ┣ 📜 page.tsx (Login UI & User Display)
 ┃ ┃ ┗ 📜 dashboard/page.tsx (Future Dashboard Page)
 ┃ ┣ 📜 package.json (Frontend dependencies)
 ┃ ┣ 📜 tailwind.config.js (Styling)
 ┃ ┗ 📂 node_modules
 ┃
 ┣ 📜 README.md (This file)
 ┗ 📜 LICENSE
```

## 🏗️ Setup Guide
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/tiao1314/peiwanservice.git
cd peiwanservice
```

### **2️⃣ Setup Backend**
```sh
cd discord-nbz-backend
npm install
cp .env.example .env  # Create and configure .env file
node server.js  # Start backend
```

### **3️⃣ Setup Frontend**
```sh
cd ../discord-auth-frontend
npm install
npm run dev  # Start Next.js frontend
```

### **4️⃣ Environment Variables (`.env` for Backend)**
```
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_REDIRECT_URI=http://localhost:5050/auth/discord/callback
SESSION_SECRET=your_random_secret
```

## 📡 API Endpoints
| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/auth/discord`         | Initiates Discord login |
| GET    | `/auth/discord/callback` | Handles login callback |
| GET    | `/auth/logout`          | Logs out the user |
| GET    | `/auth/user`            | Fetches logged-in user info |
| GET    | `/debug/session`        | Displays session data |

## 🔄 Common Issues & Fixes
### ❌ **Invalid OAuth2 redirect_uri**
- Ensure your `.env` file has the correct `DISCORD_REDIRECT_URI`:
  ```env
  DISCORD_REDIRECT_URI=http://localhost:5050/auth/discord/callback
  ```
- Update the **OAuth2 Redirects** in the [Discord Developer Portal](https://discord.com/developers/applications) to match.
- Restart your server:
  ```sh
  node server.js
  ```

### ❌ **Logout Not Working?**
- Ensure `/auth/logout` route in `server.js` is properly destroying the session:
```js
app.get('/auth/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('connect.sid'); // Clears session cookie
        res.redirect('/');
    });
});
```

### ❌ **AxiosError: 404 on Logout?**
- Ensure the frontend makes the correct API request:
```tsx
const handleLogout = () => {
    axios.get("http://localhost:5050/auth/logout", { withCredentials: true })
        .then(() => setUser(null))
        .catch(error => console.error("Logout error:", error));
};
```

### ❌ **EADDRINUSE: Address Already in Use**
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

### ❌ **Invalid `src` for Discord Avatar?**
- Allow `cdn.discordapp.com` in `next.config.js`:
```js
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
            pathname: '/avatars/**',
        }],
    },
};
module.exports = nextConfig;
```

### ❌ **Git Pull Fails Due to Divergent Branches?**
- Run one of these commands:
```sh
git pull --no-rebase  # Merge remote changes
git pull --rebase     # Reapply local changes on top of remote
git reset --hard origin/main  # (⚠️ Destroys local changes)
```

## 🚀 Future Improvements
- ✅ **Dashboard Page** for user settings
- ✅ **Database Integration** (SQLite or MongoDB)
- ✅ **Role-based Access Control**

---
### **Made with ❤️ by Tiao** 🚀
